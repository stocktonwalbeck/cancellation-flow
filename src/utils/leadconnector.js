export async function pauseLocation({ accessToken, locationId, companyId, paused = true }) {
  // Prefer calling our serverless function to avoid CORS and keep token server-side when available
  if (accessToken && locationId && companyId) {
    try {
      const res = await fetch('/api/pause', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: accessToken, locationId, companyId, paused })
      });
      if (res.ok) return await res.json();
    } catch {}
  }
  // Fallback direct call (may be blocked by CORS in browser)
  if (!accessToken || !locationId || !companyId) {
    throw new Error('Missing required fields: accessToken, locationId, companyId');
  }
  const res = await fetch(`https://services.leadconnectorhq.com/saas/pause/${encodeURIComponent(locationId)}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Version': '2021-04-15',
    },
    body: JSON.stringify({ paused, companyId }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`LeadConnector pause failed: ${res.status} ${text}`);
  }
  return await res.json().catch(() => ({}));
}


