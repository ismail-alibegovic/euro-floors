import { NextResponse } from "next/server";
import { validateQuote, type QuoteInput } from "@/lib/quote";

/**
 * Receives quote requests. Delivery is only attempted when QUOTE_WEBHOOK_URL is configured;
 * otherwise the endpoint answers 503 `not_configured` so the UI never claims a request was sent.
 */
export async function POST(req: Request) {
  let body: QuoteInput;
  try {
    body = (await req.json()) as QuoteInput;
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
  }
  const q: QuoteInput = {
    name: String(body.name ?? "").slice(0, 120),
    contact: String(body.contact ?? "").slice(0, 120),
    type: String(body.type ?? ""),
    area: String(body.area ?? "").slice(0, 12),
    message: String(body.message ?? "").slice(0, 2100),
    preset: body.preset ? String(body.preset).slice(0, 60) : undefined,
    product: body.product ? String(body.product).slice(0, 120) : undefined,
    website: String(body.website ?? ""),
  };
  // Honeypot: pretend success to bots without delivering anything.
  if (q.website) return NextResponse.json({ ok: true });

  const errors = validateQuote(q);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, code: "invalid", errors }, { status: 422 });

  const hook = process.env.QUOTE_WEBHOOK_URL;
  if (!hook) return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });

  try {
    const r = await fetch(hook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...q, website: undefined, receivedAt: new Date().toISOString(), source: "euro-floors.ba" }),
      signal: AbortSignal.timeout(10000),
    });
    if (!r.ok) throw new Error(`webhook ${r.status}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
  }
}
