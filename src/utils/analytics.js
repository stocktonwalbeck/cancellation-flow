/* Lightweight analytics wrapper. If a real analytics SDK is present, we use it; otherwise we no-op with console debug. */

export function trackEvent(eventName, properties = {}) {
  try {
    // Fire-and-forget network call to demo storage API when deployed on Vercel
    if (typeof fetch === 'function') {
      try { fetch('/api/events', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: eventName, properties }) }); } catch {}
    }
    if (typeof window !== 'undefined' && typeof window.__pushAnalyticsEvent === 'function') {
      // Test/e2e hook to capture events deterministically
      window.__pushAnalyticsEvent(eventName, properties);
    }
    if (window?.analytics?.track) {
      window.analytics.track(eventName, properties);
    } else if (window?.dataLayer) {
      window.dataLayer.push({ event: eventName, ...properties });
    } else {
      console.debug('[analytics.track]', eventName, properties);
    }
  } catch (err) {
    console.debug('[analytics.error]', err);
  }
}

export function trackPage(pageName, properties = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.__pushAnalyticsEvent === 'function') {
      window.__pushAnalyticsEvent(`page:${pageName}`, properties);
    }
    if (window?.analytics?.page) {
      window.analytics.page(pageName, properties);
    } else {
      console.debug('[analytics.page]', pageName, properties);
    }
  } catch (err) {
    console.debug('[analytics.error]', err);
  }
}


