import { categories } from "@/data/catalog";

export type QuoteInput = {
  name: string;
  contact: string;
  type: string;
  area: string;
  message: string;
  preset?: string;
  product?: string;
  website?: string; // honeypot
};

export const typeOptions = [
  ...categories.map((c) => ({ value: c.slug, label: c.name })),
  { value: "ostalo", label: "Ostale podne obloge (PVC, pluto, itison…)" },
  { value: "ne-znam", label: "Još ne znam — trebam savjet" },
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s/().-]{6,20}$/;

export type QuoteErrors = Partial<Record<"name" | "contact" | "type" | "area" | "message", string>>;

export function validateQuote(q: QuoteInput): QuoteErrors {
  const e: QuoteErrors = {};
  if (q.name.trim().length < 2) e.name = "Upišite ime i prezime.";
  const c = q.contact.trim();
  if (!c) e.contact = "Upišite e-mail ili broj telefona.";
  else if (!EMAIL.test(c) && !(PHONE.test(c) && c.replace(/\D/g, "").length >= 6))
    e.contact = "Ovo nije ispravan e-mail ni broj telefona.";
  if (!typeOptions.some((o) => o.value === q.type)) e.type = "Odaberite vrstu poda.";
  if (q.area.trim()) {
    const n = Number(q.area.replace(",", "."));
    if (!Number.isFinite(n) || n <= 0 || n > 100000) e.area = "Površinu upišite kao broj kvadratnih metara, npr. 45.";
  }
  if (q.message.length > 2000) e.message = "Poruka može imati najviše 2000 znakova.";
  return e;
}
