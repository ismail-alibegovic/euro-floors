import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col justify-end pb-24 pt-[calc(var(--header-h)+10vh)]">
      <p className="kicker">404</p>
      <h1 className="headline-xl mt-6">Ova stranica ne postoji.</h1>
      <p className="mt-8 max-w-[44ch] text-bone/70">Možda je adresa promijenjena. Krenite od kolekcija ili se vratite na početnu.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/kolekcije" className="btn btn-solid">Kolekcije <ArrowUpRight size={18} strokeWidth={1.25} /></Link>
        <Link href="/" className="btn">Početna <ArrowUpRight size={18} strokeWidth={1.25} /></Link>
      </div>
    </section>
  );
}
