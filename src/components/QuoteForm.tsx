"use client";

import { useId, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Loader2, Mail, Phone, X } from "lucide-react";
import { site } from "@/data/site";
import { getPreset } from "@/data/visualizer";
import { typeOptions, validateQuote, type QuoteErrors, type QuoteInput } from "@/lib/quote";

type Status = "idle" | "submitting" | "success" | "not_configured" | "error";

export function QuoteForm({
  preset: presetId,
  initialType,
  product,
}: {
  preset?: string;
  initialType?: string;
  product?: string;
}) {
  const reduce = useReducedMotion();
  const uid = useId();
  const presetObj = getPreset(presetId);
  const [preset, setPreset] = useState(presetObj);
  const [values, setValues] = useState<QuoteInput>({
    name: "",
    contact: "",
    type: initialType && typeOptions.some((o) => o.value === initialType) ? initialType : presetObj?.related[0] ?? "",
    area: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof QuoteInput) => (e: { target: { value: string } }) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched) setErrors(validateQuote(next));
  };

  const summary = useMemo(() => {
    const t = typeOptions.find((o) => o.value === values.type)?.label ?? "—";
    return [
      `Ime: ${values.name}`,
      `Kontakt: ${values.contact}`,
      `Vrsta poda: ${t}`,
      product ? `Proizvod: ${product}` : "",
      preset ? `Odabrano u vizualizatoru: ${preset.name} (ilustrativni prikaz)` : "",
      values.area ? `Površina: ${values.area} m²` : "",
      values.message ? `\n${values.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }, [values, preset, product]);

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Upit za ponudu — " + (values.name || "web"))}&body=${encodeURIComponent(summary)}`;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    const errs = validateQuote(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const r = await fetch("/api/upit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, preset: preset?.id, product }),
      });
      const data = (await r.json().catch(() => ({}))) as { ok?: boolean; code?: string; errors?: QuoteErrors };
      if (r.ok && data.ok) setStatus("success");
      else if (data.code === "not_configured") setStatus("not_configured");
      else if (data.code === "invalid" && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const field = "w-full border-0 border-b border-line-strong bg-transparent px-0 py-3 text-[16px] font-light text-bone placeholder:text-bone/30 transition-colors focus:border-brass focus:outline-none focus:ring-0 aria-[invalid=true]:border-[#d98c74]";
  const label = "kicker block text-bone/60";
  const err = (k: keyof QuoteErrors) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-2 text-[12.5px] text-[#e0a08c]">
        {errors[k]}
      </p>
    ) : null;

  if (status === "success") {
    return (
      <div role="status" className="border border-line p-8 md:p-10">
        <Check size={28} strokeWidth={1} className="text-brass" />
        <p className="mt-6 text-[clamp(1.6rem,3vw,2.4rem)] font-normal leading-tight tracking-[-0.03em]">Upit je poslan.</p>
        <p className="mt-3 max-w-[44ch] text-[15px] text-bone/70">
          Javit ćemo vam se na {values.contact} tokom radnog vremena ({site.hoursShort.replace("  ", ", ")}).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8" aria-describedby={`${uid}-note`}>
      {preset && (
        <div className="flex items-start justify-between gap-4 border border-brass/40 bg-brass/[0.06] p-4">
          <div className="text-[13.5px]">
            <p className="text-bone">Odabrano u vizualizatoru: {preset.name}</p>
            <p className="caption mt-1">Ilustrativni prikaz, ne konkretan proizvod. Predložit ćemo stvarne opcije sličnog izgleda.</p>
          </div>
          <button type="button" onClick={() => setPreset(undefined)} aria-label="Ukloni odabir iz vizualizatora" className="flex h-9 w-9 shrink-0 items-center justify-center text-bone/60 hover:text-bone">
            <X size={16} strokeWidth={1.25} />
          </button>
        </div>
      )}
      {product && <p className="text-[13.5px] text-bone/80">Upit se odnosi na: <span className="text-bone">{product}</span></p>}

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className={label}>Ime i prezime</label>
          <input id={`${uid}-name`} name="name" autoComplete="name" value={values.name} onChange={set("name")} className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-name-err` : undefined} required />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${uid}-contact`} className={label}>E-mail ili telefon</label>
          <input id={`${uid}-contact`} name="contact" autoComplete="email" autoCapitalize="none" autoCorrect="off" value={values.contact} onChange={set("contact")} className={field} aria-invalid={!!errors.contact} aria-describedby={errors.contact ? `${uid}-contact-err` : undefined} required />
          {err("contact")}
        </div>
        <div>
          <label htmlFor={`${uid}-type`} className={label}>Vrsta poda</label>
          <select id={`${uid}-type`} name="type" value={values.type} onChange={set("type")} className={`${field} appearance-none bg-[url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%23a2a09e'><path d='M1 1l5 5 5-5'/></svg>")] bg-[right_center] bg-no-repeat pr-6`} aria-invalid={!!errors.type} aria-describedby={errors.type ? `${uid}-type-err` : undefined} required>
            <option value="" disabled className="bg-ink-2">Odaberite…</option>
            {typeOptions.map((o) => (
              <option key={o.value} value={o.value} className="bg-ink-2">{o.label}</option>
            ))}
          </select>
          {err("type")}
        </div>
        <div>
          <label htmlFor={`${uid}-area`} className={label}>Približna površina (m²) <span className="normal-case tracking-normal text-bone/35">— neobavezno</span></label>
          <input id={`${uid}-area`} name="area" inputMode="decimal" enterKeyHint="next" value={values.area} onChange={set("area")} className={field} placeholder="npr. 45" aria-invalid={!!errors.area} aria-describedby={errors.area ? `${uid}-area-err` : undefined} />
          {err("area")}
        </div>
      </div>
      <div>
        <label htmlFor={`${uid}-message`} className={label}>Poruka <span className="normal-case tracking-normal text-bone/35">— neobavezno</span></label>
        <textarea id={`${uid}-message`} name="message" rows={4} value={values.message} onChange={set("message")} className={`${field} resize-y`} placeholder="Prostorija, postojeća podloga, rok…" aria-invalid={!!errors.message} aria-describedby={errors.message ? `${uid}-message-err` : undefined} />
        {err("message")}
      </div>
      <div className="hidden" aria-hidden="true">
        <label>Web stranica<input tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} /></label>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === "submitting"} className="btn btn-solid min-w-[240px]">
          {status === "submitting" ? (
            <>Šaljemo upit <Loader2 size={18} className="animate-spin" /></>
          ) : (
            <>Zatražite ponudu <ArrowUpRight size={18} strokeWidth={1.25} /></>
          )}
        </button>
        <p id={`${uid}-note`} className="caption max-w-[40ch]">Cijene ne objavljujemo — ponudu pripremamo prema prostoru i odabranom materijalu.</p>
      </div>

      <AnimatePresence>
        {(status === "not_configured" || status === "error") && (
          <motion.div
            role="alert"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border border-line-strong p-5 text-[14px]"
          >
            <p className="text-bone">
              {status === "not_configured"
                ? "Online slanje upita još nije povezano, pa vaš upit nije poslan."
                : "Upit nije poslan zbog greške u vezi. Pokušajte ponovo ili nam se javite direktno."}
            </p>
            <p className="mt-1 text-bone/65">Vaši podaci su sačuvani u obrascu. Pošaljite ih e-mailom jednim klikom ili nas nazovite.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={mailto} className="btn">
                <Mail size={16} strokeWidth={1.25} /> Pošalji e-mailom
              </a>
              <a href={site.phones[0].href} className="btn">
                <Phone size={16} strokeWidth={1.25} /> {site.phones[0].label}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
