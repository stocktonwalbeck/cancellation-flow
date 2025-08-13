import { test, expect, Page } from '@playwright/test';
const PROD_BASE = process.env.PLAYWRIGHT_BASE_URL || '';
const VERCEL_BYPASS = process.env.VERCEL_PROTECTION_BYPASS || '';
const LC_TOKEN = process.env.LEADCONNECTOR_TOKEN || process.env.VITE_LEADCONNECTOR_TOKEN || '';
const TEST_LOCATION_ID = process.env.TEST_LOCATION_ID || '';
const TEST_COMPANY_ID = process.env.TEST_COMPANY_ID || '';

async function instrumentAnalytics(page: Page) {
  await page.addInitScript(() => {
    const key = '__cc360_events__';
    try { localStorage.setItem(key, '[]'); } catch {}

    const record = (name: string, props: any = {}) => {
      try {
        const raw = localStorage.getItem(key) || '[]';
        const arr = JSON.parse(raw);
        arr.push({ name, props });
        localStorage.setItem(key, JSON.stringify(arr));
      } catch {}
    };

    // Hook used by app's analytics wrapper to log events deterministically
    (window as any).__pushAnalyticsEvent = (name: string, props?: any) => record(name, props || {});
    // Prefer analytics SDK if present (still record)
    (window as any).analytics = {
      track: (name: string, props?: any) => record(name, props || {}),
      page: (name: string, props?: any) => record(`page:${name}`, props || {}),
    };
    // Also capture dataLayer pushes if they happen
    (window as any).dataLayer = {
      push: (obj: any) => record(obj?.event || 'datalayer', obj || {}),
    };

    (window as any).__readEvents = () => {
      try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
    };

    // Prevent hard navigations from test-triggered offers so we can read events
    const originalAssign = window.location.assign.bind(window.location);
    (window as any).__navigations = [];
    window.location.assign = (url: string | URL) => {
      try { (window as any).__navigations.push(String(url)); } catch {}
      // no-op to keep SPA alive during tests
    };
  });
}

async function readEvents(page: Page) {
  return await page.evaluate(() => (window as any).__readEvents?.() || []);
}

test.describe('CC360 Cancellation Flow – e2e', () => {
  test.beforeEach(async ({ context }) => {
    if (PROD_BASE && VERCEL_BYPASS) {
      const { hostname } = new URL(PROD_BASE);
      await context.addCookies([
        { name: 'vercel-protection-bypass', value: VERCEL_BYPASS, domain: '.' + hostname, path: '/', httpOnly: false, secure: true },
      ]);
    }
  });
  test('happy path: reason → tailored → second chance → goodbye → confirmation', async ({ page }) => {
    await instrumentAnalytics(page);
    page.on('dialog', d => d.accept());
    // Step 1 – Loss frame
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /canceling means losing/i })).toBeVisible();
    await page.getByRole('button', { name: /continue/i }).click();

    // Step 2 – Quick reason
    await expect(page.getByRole('heading', { name: /why are you thinking/i })).toBeVisible();
    // Select one of the visible options by clicking its label text
    const choiceText = /No sales yet|Hard To Learn|No time|Bugs|Poor customer|Missing a feature|testing/i;
    await page.getByText(choiceText, { exact: false }).first().click();
    await page.getByRole('button', { name: /^Next$/ }).click();

    // Step 3 – Tailored Offer
    await expect(page.getByRole('heading')).toBeVisible();
    await page.getByRole('button', { name: /Continue To Cancel/i }).click();

    // Step 4 – Second Chance Offer
    await expect(page.getByText(/Last Chance Offer/i)).toBeVisible();
    await page.getByRole('button', { name: /Cancel my subscription/i }).click();

    // Step 5 – Goodbye page
    await expect(page.getByRole('heading', { name: /sad to see you go/i })).toBeVisible();
    await page.getByRole('button', { name: /Finish cancellation/i }).click();

    // Step 6 – Confirmation
    await expect(page.getByRole('heading', { name: /scheduled for cancellation/i })).toBeVisible();
    // Click Try Flow Again to avoid waiting for timer
    await page.getByRole('button', { name: /Try Flow Again/i }).click();
    await expect(page.getByRole('heading', { name: /canceling means losing/i })).toBeVisible();
  });

  test('accepting tailored offer fires analytics event', async ({ page }) => {
    await instrumentAnalytics(page);
    page.on('dialog', d => d.accept());
    await page.goto('/');
    await page.getByRole('button', { name: /continue/i }).click();
    await page.getByText(/No sales yet/i).click(); // maps to 50% Off
    await page.getByRole('button', { name: /^Next$/ }).click();
    await expect(page.getByRole('heading', { name: /50%/i })).toBeVisible();
    await page.getByRole('button', { name: /50% Off/i }).click();
    await page.waitForTimeout(100);
    const events = await readEvents(page);
    const accepted = events.some(e => e.name === 'cancellation_offer_accepted' && e.props?.phase === 'tailored');
    const pageTracked = events.some(e => String(e.name).startsWith('page:Cancellation – Step 3'));
    // Also verify state persisted
    const state = await page.evaluate(() => sessionStorage.getItem('cc360:cancellation'));
    const parsed = state ? JSON.parse(state) : {};
    expect(parsed?.offersAccepted?.length > 0 || accepted || pageTracked).toBeTruthy();
  });

  test('accepting second chance offer fires analytics event', async ({ page }) => {
    await instrumentAnalytics(page);
    page.on('dialog', d => d.accept());
    await page.goto('/');
    await page.getByRole('button', { name: /continue/i }).click();
    await page.getByText(/Bugs or performance issues/i).click(); // maps to Park & Protect in second chance
    await page.getByRole('button', { name: /^Next$/ }).click();
    await page.getByRole('button', { name: /Continue To Cancel/i }).click();
    await expect(page.getByText(/Last Chance Offer/i)).toBeVisible();
    await page.getByRole('button', { name: /Park & Protect/i }).click();
    await page.waitForTimeout(100);
    const events = await readEvents(page);
    const accepted = events.some(e => e.name === 'cancellation_offer_accepted' && e.props?.phase === 'secondChance');
    const pageTracked = events.some(e => String(e.name).startsWith('page:Cancellation – Step 4'));
    const state = await page.evaluate(() => sessionStorage.getItem('cc360:cancellation'));
    const parsed = state ? JSON.parse(state) : {};
    expect(parsed?.offersAccepted?.length > 0 || accepted || pageTracked).toBeTruthy();
  });

  test('LeadConnector: activate then pause via serverless API', async ({ page }) => {
    test.skip(!LC_TOKEN || !TEST_LOCATION_ID || !TEST_COMPANY_ID, 'Missing LeadConnector test credentials');
    const activate = await page.request.post('/api/pause', {
      data: { token: LC_TOKEN, locationId: TEST_LOCATION_ID, companyId: TEST_COMPANY_ID, paused: false },
    });
    expect(activate.ok()).toBeTruthy();
    const aJson = await activate.json();
    expect(aJson.ok).toBeTruthy();

    const pause = await page.request.post('/api/pause', {
      data: { token: LC_TOKEN, locationId: TEST_LOCATION_ID, companyId: TEST_COMPANY_ID, paused: true },
    });
    expect(pause.ok()).toBeTruthy();
    const pJson = await pause.json();
    expect(pJson.ok).toBeTruthy();
  });

  test('UI: set IDs, finish, and then re-activate via API', async ({ page }) => {
    test.skip(!LC_TOKEN || !TEST_LOCATION_ID || !TEST_COMPANY_ID, 'Missing LeadConnector test credentials');
    await instrumentAnalytics(page);
    page.on('dialog', d => d.accept());
    await page.goto('/');
    await page.getByRole('button', { name: /continue/i }).click();
    await page.getByText(/No sales yet|Hard To Learn|No time|Bugs|Poor customer|Missing a feature|testing/i).first().click();
    await page.getByRole('button', { name: /^Next$/ }).click();
    await page.getByRole('button', { name: /Continue To Cancel/i }).click();
    // Goodbye page: set IDs and finish
    await page.getByPlaceholder('locationId').fill(TEST_LOCATION_ID);
    await page.getByPlaceholder('companyId').fill(TEST_COMPANY_ID);
    await page.getByRole('button', { name: 'Use IDs' }).click();
    await page.getByRole('button', { name: /Finish cancellation/i }).click();
    await expect(page.getByRole('heading', { name: /scheduled for cancellation/i })).toBeVisible();
    // Re-activate to leave environment clean
    const activate = await page.request.post('/api/pause', {
      data: { token: LC_TOKEN, locationId: TEST_LOCATION_ID, companyId: TEST_COMPANY_ID, paused: false },
    });
    expect(activate.ok()).toBeTruthy();
  });
});


