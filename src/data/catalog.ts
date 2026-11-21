/**
 * Catalog built strictly from the content published on euro-floors.ba
 * ("Vrste parketa", "O parketima", "Naše usluge"). Where the source gives no
 * dimension, brand or price, the field is left out rather than filled in.
 * All photographs used for products are illustrative (Unsplash) and labelled as such.
 */

export type Spec = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  summary: string;
  description: string[];
  species: Species[];
  specs: Spec[];
  finishes?: string[];
  images: { src: string; alt: string }[];
  /** true = name/spec appears on euro-floors.ba */
  verified: true;
};

export type Species =
  | "Hrast"
  | "Jasen"
  | "Javor"
  | "Bukva"
  | "Trešnja"
  | "Bambus"
  | "Merbau"
  | "Garapa"
  | "Laminat";

export type CategorySlug =
  | "masivni-parket"
  | "gotovi-troslojni-parket"
  | "egzoticni-parket"
  | "laminati";

export type Category = {
  slug: CategorySlug;
  index: string;
  name: string;
  short: string;
  lead: string;
  body: string[];
  image: { src: string; alt: string };
  species: Species[];
};

const P = "/images/photos";

export const categories: Category[] = [
  {
    slug: "masivni-parket",
    index: "01",
    name: "Masivni parket",
    short: "Klasični i lamelni parket te seljački pod od punog drveta.",
    lead:
      "Puno drvo koje se brusi, polira i lakira na licu mjesta — pod koji se može obnavljati generacijama.",
    body: [
      "Masivni parket nudimo kao klasični i lamelni, u vrstama hrast, jasen, javor i bukva, te kao seljački pod od hrasta i jasena.",
      "Nakon postavljanja slijedi kompletna obrada: brušenje, poliranje i lakiranje. Seljački pod može doći fabrički završno obrađen — bajcan, lakiran ili uljen — ili se obrađuje nakon ugradnje.",
    ],
    image: { src: `${P}/col-masivni.jpg`, alt: "Klasična prostorija s parketom u uzorku riblje kosti ispod trpezarijskog stola" },
    species: ["Hrast", "Jasen", "Javor", "Bukva"],
  },
  {
    slug: "gotovi-troslojni-parket",
    index: "02",
    name: "Gotovi troslojni parket",
    short: "Višeslojni (tarkett) parket, fabrički završen i spreman za ugradnju.",
    lead:
      "Fabrički završen višeslojni parket koji se brzo postavlja — lijepljenjem ili plivajuće, na filc ili stirodur.",
    body: [
      "Gotovi višeslojni parket (tarkett) dostupan je u vrstama hrast, bukva, jasen, javor i trešnja.",
      "Može se postaviti na cementni estrih, keramiku, mermer ili drvenu podlogu, kao i preko potpuno zalijepljenog vinila, elastičnih pločica i linoleuma.",
    ],
    image: { src: `${P}/col-troslojni.jpg`, alt: "Svijetao dnevni boravak s hrastovim podom i velikim prozorima" },
    species: ["Hrast", "Bukva", "Jasen", "Javor", "Trešnja"],
  },
  {
    slug: "egzoticni-parket",
    index: "03",
    name: "Egzotični parket",
    short: "Bambus, merbau i garapa — vrste neobične boje i tvrdoće.",
    lead: "Bambus, merbau i garapa za prostore kojima treba izraženiji ton i karakter.",
    body: [
      "U ponudi su egzotične vrste bambus, merbau i garapa, koje i ugrađujemo.",
      "Bambus dolazi gotov i lakiran. Izdržljiv je i otporan na vlagu, pa je pogodan i za kuhinje.",
    ],
    image: { src: `${P}/col-egzoticni.jpg`, alt: "Soba s toplim crvenkastim parketom obasjana suncem" },
    species: ["Bambus", "Merbau", "Garapa"],
  },
  {
    slug: "laminati",
    index: "04",
    name: "Laminati",
    short: "Laminat debljine 6–12 mm u klasama 31, 32 i 33.",
    lead: "Laminat za stambene, poslovne i komercijalne prostore — od klase 31 do klase 33.",
    body: [
      "Laminat se proizvodi u debljinama od 6 do 12 mm. Klasa otpornosti određuje gdje se može koristiti.",
      "Uz laminat ugrađujemo i PVC pod, pluto, itison i tepison, kao i sve oblike i vrste lajsni.",
    ],
    image: { src: `${P}/col-laminati.jpg`, alt: "Prazna svijetla prostorija s laminatom u dugim lamelama" },
    species: ["Laminat"],
  },
];

export const products: Product[] = [
  {
    slug: "klasicni-masivni-parket",
    name: "Klasični masivni parket",
    category: "masivni-parket",
    summary: "Masivni parket svih dimenzija, s kompletnom obradom nakon postavljanja.",
    description: [
      "Klasični masivni parket od punog drveta. Ugrađujemo ga u svim dimenzijama i obrađujemo u cijelosti: postavljanje, brušenje, poliranje i lakiranje.",
    ],
    species: ["Hrast", "Jasen", "Javor", "Bukva"],
    specs: [
      { label: "Vrste drveta", value: "Hrast, jasen, javor, bukva" },
      { label: "Klase", value: "E, S, R, VS" },
      { label: "Dimenzije", value: "Sve dimenzije" },
      { label: "Obrada", value: "Brušenje, poliranje i lakiranje nakon ugradnje" },
    ],
    images: [
      { src: `${P}/col-masivni.jpg`, alt: "Masivni parket u klasičnom stanu" },
      { src: `${P}/macro-herringbone.jpg`, alt: "Detalj masivnih hrastovih lamela" },
      { src: `${P}/gal-sunlit-parquet.jpg`, alt: "Parket obasjan popodnevnim suncem" },
    ],
    verified: true,
  },
  {
    slug: "lamelni-masivni-parket",
    name: "Lamelni masivni parket",
    category: "masivni-parket",
    summary: "Lamelni parket od punog drveta, obrađen na licu mjesta.",
    description: [
      "Lamelni masivni parket u istim vrstama i klasama kao klasični. Završna obrada radi se nakon ugradnje.",
    ],
    species: ["Hrast", "Jasen", "Javor", "Bukva"],
    specs: [
      { label: "Vrste drveta", value: "Hrast, jasen, javor, bukva" },
      { label: "Klase", value: "E, S, R, VS" },
      { label: "Obrada", value: "Brušenje, poliranje i lakiranje nakon ugradnje" },
    ],
    images: [
      { src: `${P}/macro-light-herringbone.jpg`, alt: "Svijetli hrastov pod u modernom enterijeru" },
      { src: `${P}/macro-planks.jpg`, alt: "Detalj drvenih lamela pod kosim svjetlom" },
    ],
    verified: true,
  },
  {
    slug: "seljacki-pod-hrast",
    name: "Seljački pod — hrast",
    category: "masivni-parket",
    summary: "Široki i dugi brodovi od hrasta, debljine 20 mm.",
    description: [
      "Seljački pod od hrasta (dostupan i od jasena) dolazi fabrički završno obrađen — bajcan, lakiran ili uljen — ili neobrađen, pa ga nakon ugradnje brusimo, bajcamo, lakiramo, uljimo ili voskiramo.",
      "Obnova seljačkog poda preporučuje se svakih 15 do 20 godina.",
    ],
    species: ["Hrast", "Jasen"],
    specs: [
      { label: "Dužine", value: "500 – 2000 mm" },
      { label: "Širine", value: "120 – 200 mm" },
      { label: "Debljina", value: "20 mm" },
      { label: "Klase", value: "Prima A, Prima B, Rustik C ili E, S, R, VS ili N (natura) N1, N2" },
      { label: "Obnova", value: "Svakih 15 – 20 godina" },
    ],
    finishes: ["Bajcan", "Lakiran", "Uljen", "Voskiran", "Neobrađen (obrada nakon ugradnje)"],
    images: [
      { src: `${P}/macro-walnut-planks.jpg`, alt: "Široki brodovi seljačkog poda s izraženom teksturom" },
      { src: `${P}/gal-dining-oak.jpg`, alt: "Hrastov pod u svijetloj trpezariji" },
    ],
    verified: true,
  },
  {
    slug: "hrast-prve-klase-aqua-lak",
    name: "Hrast prve klase — Aqua lak, mat",
    category: "masivni-parket",
    summary: "Masivni hrast prve klase, završno obrađen mat Aqua lakom.",
    description: ["Masivni hrastov parket prve klase sa završnom obradom Aqua lakom u mat izvedbi."],
    species: ["Hrast"],
    specs: [
      { label: "Vrsta drveta", value: "Hrast" },
      { label: "Klasa", value: "Prva klasa" },
      { label: "Završna obrada", value: "Aqua lak, mat" },
    ],
    finishes: ["Aqua lak — mat"],
    images: [
      { src: `${P}/gal-herringbone-living.jpg`, alt: "Dnevni boravak s hrastovim parketom u ribljoj kosti" },
      { src: `${P}/macro-herringbone.jpg`, alt: "Detalj hrastovog parketa" },
    ],
    verified: true,
  },
  {
    slug: "gotovi-viseslojni-parket",
    name: "Gotovi višeslojni parket (tarkett)",
    category: "gotovi-troslojni-parket",
    summary: "Fabrički završen parket za brzu ugradnju preko postojećih podloga.",
    description: [
      "Gotovi višeslojni parket postavlja se lijepljenjem ili na filc ili stirodur. Ugradnja je brza i jednostavna, pa se može položiti i preko vinila, starijeg laminata ili pločica.",
    ],
    species: ["Hrast", "Bukva", "Jasen", "Javor", "Trešnja"],
    specs: [
      { label: "Vrste drveta", value: "Hrast, bukva, jasen, javor, trešnja" },
      { label: "Ugradnja", value: "Lijepljenjem ili na filc / stirodur" },
      {
        label: "Podloge",
        value:
          "Cementni estrih, keramika, mermer, drvena podloga; preko potpuno zalijepljenog vinila, elastičnih pločica i linoleuma",
      },
    ],
    images: [
      { src: `${P}/col-troslojni.jpg`, alt: "Svijetao stan s gotovim hrastovim parketom" },
      { src: `${P}/gal-bright-bedroom.jpg`, alt: "Spavaća soba sa svijetlim drvenim podom" },
    ],
    verified: true,
  },
  {
    slug: "polarni-hrast",
    name: "Polarni hrast",
    category: "gotovi-troslojni-parket",
    summary: "Gotovi troslojni parket u svijetlom tonu hrasta.",
    description: ["Gotovi troslojni parket u izvedbi Polarni hrast. Tehničke detalje šaljemo uz ponudu."],
    species: ["Hrast"],
    specs: [
      { label: "Vrsta drveta", value: "Hrast" },
      { label: "Tip", value: "Gotovi troslojni parket" },
    ],
    images: [
      { src: `${P}/macro-light-herringbone.jpg`, alt: "Svijetli hrastov pod" },
      { src: `${P}/gal-doorway.jpg`, alt: "Prolaz sa svijetlim parketom" },
    ],
    verified: true,
  },
  {
    slug: "stari-hrast",
    name: "Stari hrast",
    category: "gotovi-troslojni-parket",
    summary: "Gotovi troslojni parket, ljepljen dvokomponentnim ljepilom.",
    description: ["Gotovi troslojni parket u izvedbi Stari hrast, ugrađen lijepljenjem na dvokomponentno ljepilo."],
    species: ["Hrast"],
    specs: [
      { label: "Vrsta drveta", value: "Hrast" },
      { label: "Ugradnja", value: "Ljepljen na dvokomponentno ljepilo" },
    ],
    images: [
      { src: `${P}/macro-dark-herringbone.jpg`, alt: "Tamniji hrastov parket u ribljoj kosti u spavaćoj sobi" },
      { src: `${P}/macro-walnut-planks.jpg`, alt: "Detalj starog hrasta" },
    ],
    verified: true,
  },
  {
    slug: "bambus-visoki-sjaj",
    name: "Bambus — visoki sjaj",
    category: "egzoticni-parket",
    summary: "Gotov, lakiran bambus u visokom sjaju, otporan na vlagu.",
    description: [
      "Bambus je zapravo trava (trska), a parket od njega dolazi gotov i lakiran. Izdržljiv je i otporan na vlagu, pa je pogodan i za kuhinje.",
      "U poređenju s hrastom, nedostatak je ljepilo na bazi formaldehida koje se koristi u izradi.",
    ],
    species: ["Bambus"],
    specs: [
      { label: "Materijal", value: "Bambus" },
      { label: "Završna obrada", value: "Lakiran, visoki sjaj" },
      { label: "Upotreba", value: "Otporan na vlagu, pogodan i za kuhinje" },
    ],
    finishes: ["Visoki sjaj"],
    images: [
      { src: `${P}/col-egzoticni.jpg`, alt: "Topli egzotični pod u sunčanoj sobi" },
      { src: `${P}/gal-light-corner.jpg`, alt: "Sunce na drvenom podu" },
    ],
    verified: true,
  },
  {
    slug: "merbau",
    name: "Merbau",
    category: "egzoticni-parket",
    summary: "Egzotična vrsta tamnog, toplog tona.",
    description: ["Merbau parket nudimo i ugrađujemo. Dimenzije i završnu obradu dogovaramo uz ponudu."],
    species: ["Merbau"],
    specs: [{ label: "Vrsta drveta", value: "Merbau" }],
    images: [
      { src: `${P}/gal-sunlit-parquet.jpg`, alt: "Toplo crvenkasti parket u sunčanoj sobi" },
      { src: `${P}/col-egzoticni.jpg`, alt: "Egzotični parket" },
    ],
    verified: true,
  },
  {
    slug: "garapa",
    name: "Garapa",
    category: "egzoticni-parket",
    summary: "Egzotična vrsta svijetlo-zlatnog tona.",
    description: ["Garapa parket nudimo i ugrađujemo. Dimenzije i završnu obradu dogovaramo uz ponudu."],
    species: ["Garapa"],
    specs: [{ label: "Vrsta drveta", value: "Garapa" }],
    images: [
      { src: `${P}/gal-light-corner.jpg`, alt: "Zlatni ton drvenog poda na suncu" },
      { src: `${P}/macro-herringbone.jpg`, alt: "Detalj drvenog poda" },
    ],
    verified: true,
  },
  {
    slug: "laminat",
    name: "Laminat — klase 31, 32 i 33",
    category: "laminati",
    summary: "Debljine 6 – 12 mm, za stan, ured ili komercijalni prostor.",
    description: [
      "Klasa 31 namijenjena je stambenim prostorima s manjim opterećenjem, klasa 32 pojačanoj upotrebi i uredima, a klasa 33 komercijalnim prostorima i izložbenim salonima.",
    ],
    species: ["Laminat"],
    specs: [
      { label: "Debljina", value: "6 – 12 mm" },
      { label: "Klasa 31", value: "Stambeni prostori s manjim opterećenjem" },
      { label: "Klasa 32", value: "Pojačana upotreba, uredi" },
      { label: "Klasa 33", value: "Komercijalni prostori, izložbeni saloni" },
    ],
    images: [
      { src: `${P}/col-laminati.jpg`, alt: "Prostorija s laminatom" },
      { src: `${P}/gal-dining-oak.jpg`, alt: "Svijetli pod u otvorenom prostoru" },
    ],
    verified: true,
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsIn = (slug: string) => products.filter((p) => p.category === slug);
export const getProduct = (cat: string, slug: string) =>
  products.find((p) => p.category === cat && p.slug === slug);

export const allSpecies: Species[] = Array.from(new Set(products.flatMap((p) => p.species)));
