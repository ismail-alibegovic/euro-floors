/**
 * Business facts below are taken from https://euro-floors.ba/ (Kontakt, Naše usluge,
 * O parketima, Vrste parketa). Nothing here is invented: no founding year, statistics,
 * certificates or prices are published on the source site, so none are shown.
 */
export const site = {
  name: "Euro-Floors",
  wordmark: "EURO-FLOORS",
  url: "https://euro-floors.ba",
  descriptor: "Parketi i laminati",
  city: "Sarajevo",
  area: "Velešići",
  phones: [
    { label: "061 766 663", href: "tel:+38761766663" },
    { label: "061 904 990", href: "tel:+38761904990" },
  ],
  email: "info@euro-floors.ba",
  hours: "Ponedjeljak – subota, 9:00 – 18:00",
  hoursShort: "Pon – Sub  9:00 – 18:00",
  facebook:
    "https://www.facebook.com/pages/category/Local-Service/Euro-Floors-1678993488806065/",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Vele%C5%A1i%C4%87i%2C%20Sarajevo",
} as const;

/**
 * One-page navigation: every primary item is an anchor to a section of "/".
 * `href` is "/#id" (not "#id") so the same links also work from the few standalone pages
 * (product detail pages, photo credits), where they lead back to the matching section.
 */
export const nav = [
  { id: "home", href: "/#home", label: "Početna" },
  { id: "kolekcije", href: "/#kolekcije", label: "Kolekcije" },
  { id: "vizualizator", href: "/#vizualizator", label: "Vizualizator" },
  { id: "usluge", href: "/#usluge", label: "Usluge" },
  { id: "o-nama", href: "/#o-nama", label: "O nama" },
  { id: "vodic", href: "/#vodic", label: "Vodič" },
  { id: "kontakt", href: "/#kontakt", label: "Kontakt" },
] as const;

export type SectionId = (typeof nav)[number]["id"];
