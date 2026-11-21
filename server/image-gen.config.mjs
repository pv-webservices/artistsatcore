/**
 * Central configuration for AI image generation.
 * Change models, qualities or sizes here — nothing else needs rewriting.
 * The API key is NEVER stored here: it is read from process.env.OPENAI_API_KEY (server-side only).
 */
export const IMAGE_GEN_CONFIG = Object.freeze({
  endpoint: 'https://api.openai.com/v1/images/generations',
  models: Object.freeze({
    flare: process.env.OPENAI_IMAGE_MODEL_FLARE || 'gpt-image-2.5-flare', // default: speed + cost
    sunburst: process.env.OPENAI_IMAGE_MODEL_SUNBURST || 'gpt-image-2.5-sunburst', // premium: precision
  }),
  quality: Object.freeze({
    default: process.env.OPENAI_IMAGE_QUALITY_DEFAULT || 'medium',
    premium: process.env.OPENAI_IMAGE_QUALITY_PREMIUM || 'high',
  }),
  sizes: Object.freeze({
    square: '1024x1024',
    landscape: '1536x1024',
    portrait: '1024x1536',
  }),
  outputFormat: 'png', // lossless master; optimized to WebP afterwards
  rawOutputDir: 'assets-src/generated',
  requestTimeoutMs: 180_000,
  maxRetries: 2,
});

/** Tags that justify the premium model. Anything else routes to Flare. */
const PREMIUM_TAGS = new Set([
  'hero', 'premium-banner', 'photoreal', 'complex-composition', 'multi-subject',
  'reference-image', 'edit', 'person-consistency', 'product-consistency', 'brand-placement',
  'architecture', 'interior', 'machinery', 'complex-lighting', 'commercial-scene', 'flare-insufficient',
]);

/** Tags that justify premium quality on whichever model is used. */
const HIGH_QUALITY_TAGS = new Set([
  'hero', 'key-visual', 'client-facing', 'detail-sensitive', 'premium-banner', 'complex-composition',
]);

/**
 * Picks model + quality + size automatically from an asset's declared purpose.
 * @param {{ tags?: string[], orientation?: 'square'|'landscape'|'portrait' }} asset
 */
export function routeImageRequest(asset) {
  const tags = asset.tags || [];
  const premiumHits = tags.filter((t) => PREMIUM_TAGS.has(t));
  // Sunburst only when at least two premium signals appear, or an explicit hero / fallback.
  const useSunburst =
    tags.includes('hero') || tags.includes('flare-insufficient') || tags.includes('edit') || premiumHits.length >= 2;
  // Quality is decided independently of the model: a Sunburst card image can still be medium.
  const useHigh = tags.some((t) => HIGH_QUALITY_TAGS.has(t));
  return {
    model: useSunburst ? IMAGE_GEN_CONFIG.models.sunburst : IMAGE_GEN_CONFIG.models.flare,
    tier: useSunburst ? 'sunburst' : 'flare',
    quality: useHigh ? IMAGE_GEN_CONFIG.quality.premium : IMAGE_GEN_CONFIG.quality.default,
    size: IMAGE_GEN_CONFIG.sizes[asset.orientation || 'landscape'],
  };
}
