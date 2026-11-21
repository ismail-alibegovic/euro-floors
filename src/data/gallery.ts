/** Inspiration gallery. These are licensed stock photographs (Unsplash), NOT Euro-Floors projects. */
export type GalleryItem = { src: string; alt: string; title: string; caption: string; w: number; h: number };
const P = "/images/photos";
export const gallery: GalleryItem[] = [
  { src: `${P}/gal-herringbone-living.jpg`, alt: "Prostran dnevni boravak s parketom u ribljoj kosti i velikim prozorima", title: "Riblja kost u otvorenom prostoru", caption: "Uzorak koji vodi pogled kroz cijelu prostoriju.", w: 1800, h: 1296 },
  { src: `${P}/macro-herringbone.jpg`, alt: "Detalj hrastovih lamela u ribljoj kosti", title: "Spoj lamela", caption: "Svaka lamela nosi vlastiti crtež goda.", w: 1400, h: 933 },
  { src: `${P}/gal-sunlit-parquet.jpg`, alt: "Sunce pada preko toplog parketa u sobi s visokim prozorima", title: "Toplo popodne", caption: "Tamniji ton upija svjetlo i smiruje prostor.", w: 1400, h: 2100 },
  { src: `${P}/gal-dining-oak.jpg`, alt: "Otvorena trpezarija i boravak sa svijetlim hrastovim podom", title: "Hrast u svakodnevici", caption: "Dugi brodovi produžuju prostor.", w: 1600, h: 1067 },
  { src: `${P}/gal-light-corner.jpg`, alt: "Ugao sobe s parketom u ribljoj kosti obasjan suncem", title: "Svjetlo na drvetu", caption: "Isti pod, drugačiji sat u danu.", w: 1200, h: 1800 },
  { src: `${P}/gal-warm-lounge.jpg`, alt: "Topao salon sa zidnim drvenim letvicama i svijetlim podom", title: "Topla tama", caption: "Drvo na zidu i podu u istom tonu.", w: 1600, h: 1067 },
  { src: `${P}/macro-planks.jpg`, alt: "Stare drvene daske pod kosim svjetlom", title: "Patina", caption: "Tragovi vremena kao dio karaktera.", w: 1400, h: 933 },
  { src: `${P}/gal-doorway.jpg`, alt: "Prolaz između dvije sobe sa svijetlim parketom", title: "Prijelaz", caption: "Kontinuiran pod povezuje prostorije.", w: 1200, h: 1800 },
  { src: `${P}/gal-slat-wall.jpg`, alt: "Moderni boravak s tamnim zidnim letvicama", title: "Ritam letvica", caption: "Drvo kao arhitektonski element.", w: 1600, h: 1067 },
];
