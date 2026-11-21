/**
 * Server-side OpenAI Image API client.
 * Runs only in Node (build scripts / server). Never import this from browser code.
 */
import { IMAGE_GEN_CONFIG, routeImageRequest } from './image-gen.config.mjs';

function getApiKey() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error('OPENAI_API_KEY is not set. Add it to .env (never commit it) or the server environment.');
  }
  return key;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function postOnce(body) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), IMAGE_GEN_CONFIG.requestTimeoutMs);
  try {
    const res = await fetch(IMAGE_GEN_CONFIG.endpoint, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getApiKey()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = json?.error?.message || `HTTP ${res.status}`;
      const err = new Error(`OpenAI image request failed: ${msg}`);
      err.status = res.status;
      throw err;
    }
    const b64 = json?.data?.[0]?.b64_json;
    if (!b64) throw new Error('OpenAI image response contained no image data.');
    return Buffer.from(b64, 'base64');
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Generates one image for a declared asset and returns its bytes plus the routing used.
 * @param {{ id: string, prompt: string, tags?: string[], orientation?: string }} asset
 */
export async function generateImage(asset) {
  if (!asset?.prompt) throw new Error(`Asset "${asset?.id}" has no prompt.`);
  const route = routeImageRequest(asset);
  const body = {
    model: route.model,
    prompt: asset.prompt,
    size: route.size,
    quality: route.quality,
    n: 1,
    output_format: IMAGE_GEN_CONFIG.outputFormat,
  };

  let lastErr;
  for (let attempt = 0; attempt <= IMAGE_GEN_CONFIG.maxRetries; attempt += 1) {
    try {
      const bytes = await postOnce(body);
      return { bytes, route };
    } catch (err) {
      lastErr = err;
      const retryable = !err.status || err.status === 429 || err.status >= 500;
      if (!retryable) break;
      await sleep(2000 * (attempt + 1));
    }
  }
  throw lastErr;
}
