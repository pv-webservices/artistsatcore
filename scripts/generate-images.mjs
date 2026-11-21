#!/usr/bin/env node
/**
 * Generates the AI assets declared in server/image-manifest.mjs.
 *   npm run images:generate              -> generate missing assets
 *   npm run images:generate -- --force   -> regenerate all
 *   npm run images:generate -- svc-vr    -> only the listed ids
 * Masters are written to assets-src/generated/*.png; run `npm run images:optimize` afterwards.
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { IMAGE_GEN_CONFIG } from '../server/image-gen.config.mjs';
import { GENERATED_ASSETS } from '../server/image-manifest.mjs';
import { generateImage } from '../server/image-service.mjs';

const args = process.argv.slice(2);
const force = args.includes('--force');
const only = args.filter((a) => !a.startsWith('--'));

const exists = (p) => access(p).then(() => true, () => false);

async function run() {
  const outDir = path.resolve(IMAGE_GEN_CONFIG.rawOutputDir);
  await mkdir(outDir, { recursive: true });
  const queue = GENERATED_ASSETS.filter((a) => only.length === 0 || only.includes(a.id));

  const results = await Promise.allSettled(
    queue.map(async (asset) => {
      const file = path.join(outDir, `${asset.id}.png`);
      if (!force && (await exists(file))) return `skip  ${asset.id} (exists)`;
      const t0 = Date.now();
      const { bytes, route } = await generateImage(asset);
      await writeFile(file, bytes);
      return `done  ${asset.id} -> ${route.model} · ${route.quality} · ${route.size} (${((Date.now() - t0) / 1000).toFixed(1)}s)`;
    }),
  );

  let failed = 0;
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') console.log(r.value);
    else {
      failed += 1;
      console.error(`FAIL  ${queue[i].id}: ${r.reason?.message}`);
    }
  });
  if (failed) process.exitCode = 1;
}

run().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
