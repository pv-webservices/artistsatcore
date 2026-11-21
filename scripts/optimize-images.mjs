#!/usr/bin/env node
/**
 * Converts the client's original assets (public/) and AI masters (assets-src/generated/)
 * into responsive WebP files in static/media, and writes src/data/media.json for the templates.
 * - Film stills: letterbox bars are detected and trimmed automatically.
 * - Logos: kept as alpha WebP, trimmed to content.
 */
import { mkdir, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { MEDIA_SOURCES } from './media-sources.mjs';

const ROOT = path.resolve('.');
const OUT = path.join(ROOT, 'static', 'media');
const MANIFEST = path.join(ROOT, 'src', 'data', 'media.json');

const slug = (name) =>
  name.toLowerCase().replace(/\.(png|jpe?g|webp)$/, (m) => (m === '.png' ? '-p' : m === '.jpeg' ? '-e' : ''))
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Finds rows of near-black letterboxing at the top and bottom of a frame. */
async function letterboxCrop(img) {
  const { data, info } = await img.clone().greyscale().resize({ width: 200 }).raw().toBuffer({ resolveWithObject: true });
  const rowMean = (y) => {
    let s = 0;
    for (let x = 0; x < info.width; x += 1) s += data[y * info.width + x];
    return s / info.width;
  };
  const isBar = (y) => rowMean(y) < 14;
  let top = 0;
  while (top < info.height / 3 && isBar(top)) top += 1;
  let bottom = info.height - 1;
  while (bottom > (info.height * 2) / 3 && isBar(bottom)) bottom -= 1;
  const scale = (await img.metadata()).height / info.height;
  const cutTop = top > 1 ? Math.ceil((top + 1) * scale) : 0;
  const cutBottom = info.height - 1 - bottom > 1 ? Math.ceil((info.height - bottom) * scale) : 0;
  return { cutTop, cutBottom };
}

async function processPhoto(srcPath, name, { widths = [480, 960, 1600], trimBars = false, quality = 74 }) {
  let img = sharp(srcPath, { failOn: 'none' }).rotate();
  const meta = await img.metadata();
  let { width, height } = meta;
  if (trimBars) {
    const { cutTop, cutBottom } = await letterboxCrop(img);
    if (cutTop + cutBottom > 0) {
      height = height - cutTop - cutBottom;
      img = sharp(await img.extract({ left: 0, top: cutTop, width, height }).toBuffer());
    }
  }
  const s = slug(name);
  const usable = widths.filter((w) => w <= width);
  if (!usable.length || usable[usable.length - 1] < Math.min(width, widths[widths.length - 1])) usable.push(Math.min(width, widths[widths.length - 1]));
  const outWidths = [...new Set(usable)].sort((a, b) => a - b);
  await Promise.all(
    outWidths.map((w) =>
      img.clone().resize({ width: w, withoutEnlargement: true }).webp({ quality, effort: 5, smartSubsample: true })
        .toFile(path.join(OUT, `${s}-${w}.webp`)),
    ),
  );
  return { slug: s, w: width, h: height, widths: outWidths };
}

async function processLogo(srcPath, name, { width = 320 }) {
  const s = slug(name);
  const trimmedBuf = await sharp(srcPath).trim().png().toBuffer();
  const { width: tw } = await sharp(trimmedBuf).metadata();
  const outFile = path.join(OUT, `${s}.webp`);
  await sharp(trimmedBuf).resize({ width: Math.min(width, tw), withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 100 }).toFile(outFile);
  const { width: w, height: h } = await sharp(outFile).metadata();
  return { slug: s, w, h, widths: [w], logo: true };
}

async function run() {
  await mkdir(OUT, { recursive: true });
  await mkdir(path.dirname(MANIFEST), { recursive: true });
  const manifest = {};
  const genDir = path.join(ROOT, 'assets-src', 'generated');
  const generated = new Set(await readdir(genDir).catch(() => []));

  const jobs = MEDIA_SOURCES.map(async (item) => {
    const isGen = item.generated;
    const file = isGen ? `${item.name}.png` : item.name;
    if (isGen && !generated.has(file)) {
      console.warn(`missing generated master: ${file}`);
      return;
    }
    const src = isGen ? path.join(genDir, file) : path.join(ROOT, 'public', file);
    const entry = item.logo ? await processLogo(src, file, item) : await processPhoto(src, file, item);
    manifest[item.name] = entry;
  });
  await Promise.all(jobs);

  // Brand: logo + favicons from the client's own mark.
  const logoSrc = path.join(ROOT, 'public', 'A@c.png');
  const trimmedLogo = await sharp(logoSrc).trim().toBuffer();
  await sharp(trimmedLogo).resize({ width: 360 }).webp({ quality: 95, alphaQuality: 100 }).toFile(path.join(OUT, 'logo.webp'));
  await sharp(trimmedLogo).resize({ width: 360 }).png().toFile(path.join(OUT, 'logo.png'));
  const fav = path.join(ROOT, 'public', '1.png');
  await sharp(fav).resize(32, 32, { fit: 'contain', background: '#000' }).png().toFile(path.join(ROOT, 'static', 'favicon-32.png'));
  await sharp(fav).resize(180, 180, { fit: 'contain', background: '#000' }).png().toFile(path.join(ROOT, 'static', 'apple-touch-icon.png'));
  // Social share card from a real film still.
  await sharp(path.join(ROOT, 'public', 'DLF-Emporio.png')).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 80 })
    .toFile(path.join(ROOT, 'static', 'og-image.jpg'));

  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  await writeFile(MANIFEST, JSON.stringify(sorted, null, 1));
  console.log(`optimized ${Object.keys(sorted).length} assets -> static/media`);
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
