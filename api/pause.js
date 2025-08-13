export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { locationId, companyId, paused = true, token } = body;
    const accessToken = token || process.env.LEADCONNECTOR_TOKEN || process.env.VITE_LEADCONNECTOR_TOKEN;
    if (!accessToken || !locationId || !companyId) {
      return res.status(400).json({ ok: false, error: 'Missing token, locationId or companyId' });
    }
    const upstream = await fetch(`https://services.leadconnectorhq.com/saas/pause/${encodeURIComponent(locationId)}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Version': '2021-04-15',
      },
      body: JSON.stringify({ paused, companyId }),
    });
    const text = await upstream.text();
    const data = (() => { try { return JSON.parse(text); } catch { return { raw: text }; } })();
    return res.status(upstream.status || 200).json({ ok: upstream.ok, status: upstream.status, data });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e?.message || e) });
  }
}


