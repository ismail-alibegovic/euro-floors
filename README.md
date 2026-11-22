# Euro-Floors — website redesign

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Motion for React. Bosnian (`lang="bs"`).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## One-page structure
The whole site is a single continuous-scroll page (`src/app/page.tsx`); sections are anchors, navigation is `/#id` links
(`src/data/site.ts` → `nav`), smooth-scrolled natively, with the active item tracked by an IntersectionObserver.
Order: `#home` → `#kolekcije` (+ `#katalog`) → `#vizualizator` → `#usluge` → `#o-nama` (+ `#projekti`) → `#vodic` → `#kontakt` → footer.
Sections hand data to each other (filters, floor presets, quote prefill) through `components/SiteState.tsx`.
Former routes (`/kolekcije`, `/vizualizator`, `/usluge`, `/projekti`, `/o-nama`, `/vodic`, `/kontakt`, `/kolekcije/:kategorija`) redirect to the
matching anchor (`next.config.ts`). Product pages `/kolekcije/[kategorija]/[proizvod]` remain as standalone URLs; the home page opens the same
details in a dialog.

## Content rules
- Business facts (`src/data/site.ts`, `catalog.ts`, `services.ts`) come only from euro-floors.ba. No prices, stock, reviews, certificates or years are invented.
- All photographs are licensed Unsplash images and labelled as illustrative; credits at `/zasluge` (`src/data/credits.ts`).
- The gallery is an inspiration gallery, not Euro-Floors projects.

## Quote form
`POST /api/upit` validates input. It only delivers when `QUOTE_WEBHOOK_URL` is set (see `.env.example`).
Without it, the API answers `503 not_configured` and the form offers a prefilled e-mail / phone fallback instead of claiming the request was sent.

## Floor visualizer
The `#vizualizator` section of the home page. Six illustrative presets are pre-rendered images of one reference room
(`public/images/visualizer`) in which only the floor changes. Pipeline in `tools/visualizer/`:

1. `segf.py` — SegFormer (ADE20K) floor probability; `mask.py`/`mask2.py` — guided-filter edge refinement + traced exclusions for chair legs.
2. `render.py` — real wood photos are cut into planks / herringbone, perspective-projected onto the floor plane
   (vanishing point measured from the room), mip-filtered and super-sampled; original floor lighting and contact shadows are transferred.
3. `final.py` — exports the room images and swatches.

The upload-your-own-room feature is not implemented and is not offered.
