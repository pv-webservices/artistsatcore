/**
 * Tiny build-time templating: replaces <!--@name {json}--> markers in HTML entry files
 * with the output of the matching render function. Output is plain static HTML (SEO-friendly).
 */
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const MARKER = /<!--@(\w+)(\s+\{[\s\S]*?\})?\s*-->/g;
const MODULES = ['layout.mjs', 'sections.mjs', 'pages.mjs'];

async function loadRegistry(bust) {
  const dir = path.resolve('src/build');
  const mods = await Promise.all(
    MODULES.map((m) => import(`${pathToFileURL(path.join(dir, m)).href}${bust ? `?t=${Date.now()}` : ''}`)),
  );
  return Object.assign({}, ...mods);
}

export default function templates() {
  let isDev = false;
  return {
    name: 'aac-templates',
    configResolved(cfg) {
      isDev = cfg.command === 'serve';
    },
    handleHotUpdate({ file, server }) {
      if (file.includes(`${path.sep}src${path.sep}build${path.sep}`) || file.endsWith('media.json') || file.replace(/\\/g, '/').includes('/src/build/')) {
        server.ws.send({ type: 'full-reload' });
      }
    },
    transformIndexHtml: {
      order: 'pre',
      async handler(html) {
        const registry = await loadRegistry(isDev);
        const jobs = [];
        html.replace(MARKER, (match, name, json) => {
          jobs.push({ match, name, json });
          return match;
        });
        let out = html;
        for (const { match, name, json } of jobs) {
          const fn = registry[name];
          if (typeof fn !== 'function') throw new Error(`Unknown template marker: ${name}`);
          const args = json ? JSON.parse(json.trim()) : undefined;
          out = out.replace(match, () => fn(args));
        }
        return out;
      },
    },
  };
}

/** Dev-only stand-in for the PHP mail handler so the form can be tested locally. */
export function devContactApi() {
  return {
    name: 'aac-dev-contact',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/contact.php', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          return res.end();
        }
        let body = '';
        req.on('data', (c) => (body += c));
        req.on('end', () => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: true, dev: true, message: 'Thanks — your enquiry has been received.' }));
        });
      });
    },
  };
}
