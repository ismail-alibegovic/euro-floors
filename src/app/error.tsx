"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="shell flex min-h-[70svh] flex-col justify-end pb-24 pt-[calc(var(--header-h)+10vh)]">
      <p className="kicker">Greška</p>
      <h1 className="headline mt-6">Stranica se nije učitala.</h1>
      <p className="mt-6 max-w-[44ch] text-bone/70">Pokušajte ponovo. Ako se problem ponovi, pozovite nas na 061 766 663.</p>
      <button type="button" onClick={reset} className="btn btn-solid mt-8 w-fit">Pokušaj ponovo</button>
    </section>
  );
}
