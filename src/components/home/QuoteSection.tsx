import { site } from "@/data/site";
import { QuoteForm } from "../QuoteForm";
import { SplitText } from "../SplitText";

export function QuoteSection() {
  return (
    <section id="ponuda" aria-labelledby="quote-title" className="scroll-mt-20 bg-paper text-paper-ink">
      <div className="shell grid gap-14 py-24 md:grid-cols-12 md:py-36">
        <div className="md:col-span-5">
          <SplitText as="h2" id="quote-title" lines={["Imate prostor", "na umu?"]} className="headline" />
          <p data-reveal="" className="mt-8 max-w-[36ch] text-[16px] text-paper-ink/70">
            Recite nam šta planirate. Zajedno ćemo pronaći odgovarajući pod.
          </p>
          <dl data-reveal="" className="mt-12 grid grid-cols-2 gap-6 border-t border-paper-ink/15 pt-6 text-[13.5px]">
            <div>
              <dt className="text-paper-ink/50">Telefon</dt>
              {site.phones.map((p) => (
                <dd key={p.href}><a href={p.href} className="inline-block py-1 hover:underline">{p.label}</a></dd>
              ))}
            </div>
            <div>
              <dt className="text-paper-ink/50">Radno vrijeme</dt>
              <dd className="py-1">{site.hours}</dd>
            </div>
          </dl>
        </div>
        <div className="quote-light md:col-span-6 md:col-start-7">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
