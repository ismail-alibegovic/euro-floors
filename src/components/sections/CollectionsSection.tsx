import { SectionHead } from "./SectionHead";
import { CategoryCards } from "./CategoryCards";
import { CatalogBrowser } from "../CatalogBrowser";

/** #kolekcije — the four categories as entry points, then the full filterable catalog. */
export function CollectionsSection() {
  return (
    <section id="kolekcije" aria-labelledby="kolekcije-title" className="anchor border-b border-line">
      <SectionHead
        index="01"
        titleId="kolekcije-title"
        title={["Materijali", "iz naše ponude."]}
        lead="Od punog drveta koje se brusi na licu mjesta do laminata za poslovne prostore. Specifikacije su preuzete iz naše ponude; ono što nije navedeno, dogovaramo uz ponudu."
      />
      <div className="shell">
        <CategoryCards />
        <div id="katalog" className="anchor pb-20 pt-14 sm:pb-24 lg:pb-28">
          <CatalogBrowser />
        </div>
      </div>
    </section>
  );
}
