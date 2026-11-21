/** Services as listed on euro-floors.ba ("Naše usluge"), reworded for the new site. */
export type Service = { slug: string; title: string; short: string; body: string[]; image?: { src: string; alt: string } };

const P = "/images/photos";

export const services: Service[] = [
  {
    slug: "savjetovanje",
    title: "Savjetovanje i izbor poda",
    short: "Klasični (masivni) ili gotovi parket, drvo ili laminat — pomažemo da odluka odgovara prostoru.",
    body: [
      "Kod zamjene postojećeg poda ili uređenja novog prostora razgovaramo o namjeni, podlozi i željenom izgledu, pa predlažemo vrstu poda i način ugradnje.",
      "Uzorke tonova možete prvo isprobati u našem vizualizatoru.",
    ],
    image: { src: `${P}/gal-doorway.jpg`, alt: "Prolaz između soba sa svijetlim parketom" },
  },
  {
    slug: "nabavka",
    title: "Nabavka materijala",
    short: "Nabavljamo materijal po vašoj želji i izboru.",
    body: ["Nudimo usluge nabavke materijala po vašoj želji i izboru — parketa, laminata, lajsni i ostalih podnih obloga."],
  },
  {
    slug: "masivni-parket",
    title: "Ugradnja i obrada masivnog parketa",
    short: "Postavljanje, brušenje, poliranje i lakiranje klasičnog i lamelnog parketa.",
    body: [
      "Ugradnja i kompletna obrada masivnih parketa — klasičnih i lamelnih — svih dimenzija, u vrstama hrast, jasen, javor i bukva, klasa E, S, R i VS.",
      "Obrada obuhvata postavljanje, brušenje, poliranje i lakiranje.",
    ],
    image: { src: `${P}/macro-herringbone.jpg`, alt: "Hrastove lamele u ribljoj kosti" },
  },
  {
    slug: "seljacki-pod",
    title: "Seljački pod",
    short: "Ugradnja fabrički obrađenog ili kompletna obrada neobrađenog seljačkog poda.",
    body: [
      "Ugrađujemo fabrički završno obrađene masivne parkete — bajcane, lakirane ili uljene (seljački pod).",
      "Seljački pod koji nije površinski obrađen u fabrici ugrađujemo i obrađujemo u cijelosti: brušenje, bajcanje, lakiranje, uljenje ili voskiranje.",
    ],
    image: { src: `${P}/macro-walnut-planks.jpg`, alt: "Široki brodovi seljačkog poda" },
  },
  {
    slug: "gotovi-parket",
    title: "Gotovi višeslojni parket",
    short: "Ugradnja tarkett parketa lijepljenjem ili na filc i stirodur.",
    body: [
      "Ugradnja gotovih višeslojnih parketa (tarkett) lijepljenjem ili plivajuće, na filc ili stirodur.",
      "Postavlja se na cementni estrih, keramiku, mermer i drvenu podlogu, ali i preko potpuno zalijepljenog vinila, elastičnih pločica i linoleuma.",
    ],
    image: { src: `${P}/col-troslojni.jpg`, alt: "Stan s gotovim hrastovim parketom" },
  },
  {
    slug: "egzoticni",
    title: "Egzotični parketi",
    short: "Ugradnja bambusa, merbaua i garape.",
    body: ["Ugradnja egzotičnih parketa: bambus, merbau i garapa."],
  },
  {
    slug: "laminat-i-obloge",
    title: "Laminat i ostale podne obloge",
    short: "Laminat, PVC pod, pluto, itison i tepison.",
    body: ["Ugradnja laminata, PVC poda, pluta, itisona i tepisona."],
    image: { src: `${P}/col-laminati.jpg`, alt: "Prostorija s laminatom" },
  },
  {
    slug: "lajsne",
    title: "Lajsne",
    short: "Ugradnja svih oblika i vrsta lajsni.",
    body: ["Završni detalj svakog poda: ugrađujemo lajsne svih oblika i vrsta."],
  },
  {
    slug: "odrzavanje",
    title: "Obnova i održavanje",
    short: "Brušenje i nova završna obrada kada pod zatraži osvježenje.",
    body: [
      "Masivni pod može se ponovo brusiti i obraditi. Za seljački pod obnova se preporučuje svakih 15 do 20 godina.",
      "Javite nam stanje poda i vrstu završne obrade, pa ćemo predložiti postupak.",
    ],
  },
];
