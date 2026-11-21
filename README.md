# Artists at Core Films — website

A static marketing site built with Vite and plain HTML, CSS and JS. Motion uses GSAP ScrollTrigger and Lenis. Every page is pre-rendered to plain HTML at build time, which keeps it SEO-friendly. The site runs on any Apache/LiteSpeed host (e.g. Hostinger), and the enquiry form uses PHP.

## Commands
```
npm install
npm run dev               # http://localhost:5173 (the form posts to a dev mock)
npm run build             # -> dist/  (upload the contents of dist/ to public_html)
npm run images:optimize   # public/ originals + AI masters -> static/media/*.webp + src/data/media.json
npm run images:generate   # server-side OpenAI image generation (needs OPENAI_API_KEY in .env)
```

## Structure
| Path | Purpose |
|---|---|
| `index.html`, `our-work/`, `services/`, `ai-video-production-gurgaon/`, `gallery/`, `contact-us/`, `404.html` | Page entries. They contain `<!--@marker-->` slots that are filled at build time |
| `src/build/site-data.mjs` | **All business content**: contacts, projects, services, FAQs, clients. Edit content here |
| `src/build/{layout,sections,pages,ui}.mjs` | HTML templates (header, drawer, footer, sections) |
| `src/styles/` | Design system: `tokens.css` (colours, type, spacing), then chrome, components, home, pages |
| `src/js/` | `core` (scroll, nav, drawer), `hero` (loader + viewfinder), `scroll` (motion), `media` (video modal, lightbox), `ui` (FAQ, filters, select, form) |
| `public/` | The client's **original assets**, kept untouched. They are not deployed |
| `static/` | Files that are deployed as-is: optimized `media/`, `api/contact.php`, `.htaccess`, robots, sitemap |
| `server/` | Server-side OpenAI image layer (Node only, never shipped to the browser) |

## AI image generation
- The key is read only from `process.env.OPENAI_API_KEY`: `.env` locally, or the server environment. `.env` is git-ignored.
- The models, qualities and sizes live in `server/image-gen.config.mjs`. You can override them with env vars.
- `routeImageRequest()` picks the model automatically:
  - **Flare** is the default.
  - **Sunburst** is used for hero assets, edits, or assets with two or more premium signals (architecture, interiors, photoreal, complex lighting…).
  - Quality is set separately: `high` only for key or hero visuals.
- Every generated asset is declared, with its placement and purpose, in `server/image-manifest.mjs`. There are 5 in total:

| Asset | Used for | Model / quality |
|---|---|---|
| `ai-hybrid` | AI section and AI page hero | Sunburst / high |
| `ai-studio` | AI page "AI video production" | Flare / high |
| `svc-post` | Post-production | Flare / high |
| `svc-vr` | VR and 360° | Sunburst |
| `svc-avatar` | AI avatars and multi-language | Flare / high |

## Enquiry form
`static/api/contact.php` takes a JSON POST, then:
- validates the fields and checks a honeypot field
- checks that the request comes from the site's own origin
- allows 5 submissions per IP per hour
- sends the enquiry with `mail()` to dheeraj@ and richa@

You can override the recipients with the `AAC_MAIL_TO` and `AAC_MAIL_FROM` env vars. If the mail send fails, the page offers a pre-filled email and the phone number instead.

## Before go-live, confirm with the client
- FAQ "How long does a video take? 2 to 6 weeks": this was marked `[CONFIRM]` on the old site.
- WhatsApp links use +91 98107 36701.
- The sender address `website@artistsatcore.com` must be allowed to send mail on the host (SPF).
