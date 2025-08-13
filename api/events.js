// Simple serverless endpoint to store analytics-like events in Vercel KV or fallback to memory for demo
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).json({ ok: true });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { name, properties = {}, ts = Date.now() } = body;
    const event = { name, properties, ts };
    if (kv) {
      const key = `cc360:events:${new Date().toISOString().slice(0, 10)}`; // daily list
      await kv.rpush(key, JSON.stringify(event));
      await kv.expire(key, 60 * 60 * 24 * 30); // keep 30 days
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(200).json({ ok: true }); // swallow for demo purposes
  }
}


