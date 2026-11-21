"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Mic, Plus } from "lucide-react";

const picks = ["Masivni parket", "Riblja kost", "Seljački pod", "Troslojni parket", "Laminat", "Brušenje i lakiranje"];

type Recognition = {
  lang: string;
  interimResults: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

/**
 * The reference's prompt field, made useful for a flooring business: describe the room or the
 * floor you want, and the idea is carried into the quote form on /kontakt.
 * "+" offers quick material picks; the mic appears only where the browser supports dictation.
 */
export function IdeaBar() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const id = useId();
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [canDictate, setCanDictate] = useState(false);
  const [listening, setListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const recRef = useRef<Recognition | null>(null);

  useEffect(() => {
    const w = window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown };
    setCanDictate(Boolean(w.SpeechRecognition || w.webkitSpeechRecognition));
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function addPick(p: string) {
    setText((t) => (t.trim() ? `${t.trim().replace(/[,.]$/, "")}, ${p.toLowerCase()}` : p));
    setOpen(false);
    inputRef.current?.focus();
  }

  function dictate() {
    if (listening) {
      recRef.current?.stop();
      return;
    }
    const w = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
    const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Ctor) return;
    const rec = new Ctor();
    rec.lang = "hr-HR";
    rec.interimResults = false;
    rec.onresult = (e) => {
      const said = Array.from(e.results).map((r) => r[0].transcript).join(" ");
      setText((t) => (t ? `${t} ${said}` : said));
    };
    rec.onend = () => setListening(false);
    recRef.current = rec;
    setListening(true);
    rec.start();
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = text.trim();
    router.push(q ? `/kontakt?poruka=${encodeURIComponent(q)}#ponuda` : "/kontakt#ponuda");
  }

  return (
    <div ref={wrapRef} className="relative">
      <form onSubmit={onSubmit} role="search" aria-label="Opišite svoju ideju" className="glass-bar flex h-[54px] items-center gap-1 pl-1.5 pr-1.5 md:h-[60px] md:pl-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`${id}-picks`}
          aria-label="Dodajte materijal ili uslugu"
          className="flex h-11 w-11 shrink-0 items-center justify-center text-bone/75 transition-colors hover:text-bone"
        >
          <Plus size={17} strokeWidth={1.25} className={`transition-transform duration-500 ${open ? "rotate-45" : ""}`} />
        </button>
        <label htmlFor={`${id}-q`} className="sr-only">Vaša ideja</label>
        <input
          ref={inputRef}
          id={`${id}-q`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={500}
          autoComplete="off"
          enterKeyHint="send"
          placeholder="Recite nam ideju: prostorija, stil ili ton poda (npr. svijetli hrast za dnevni boravak)…"
          className="h-full min-w-0 flex-1 bg-transparent text-[13px] text-bone caret-brass placeholder:text-bone/45 focus:outline-none"
        />
        {canDictate && (
          <button
            type="button"
            onClick={dictate}
            aria-pressed={listening}
            aria-label={listening ? "Zaustavite diktiranje" : "Diktirajte ideju"}
            className={`hidden h-11 w-11 shrink-0 items-center justify-center transition-colors sm:flex ${listening ? "text-brass" : "text-bone/75 hover:text-bone"}`}
          >
            <Mic size={16} strokeWidth={1.25} />
          </button>
        )}
        <button
          type="submit"
          aria-label="Pošaljite ideju i zatražite ponudu"
          className="group flex h-10 w-10 shrink-0 items-center justify-center bg-[#f3f1ee] text-brass shadow-[0_2px_10px_rgb(0_0_0/0.25)] transition-colors hover:bg-white md:h-11 md:w-11"
        >
          <ArrowUpRight size={20} strokeWidth={1.25} className="text-[#a8834f] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </form>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={`${id}-picks`}
            aria-label="Brzi izbor"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass-bar absolute left-0 top-[calc(100%+8px)] z-20 flex max-w-full flex-wrap gap-1.5 p-2"
          >
            {picks.map((p) => (
              <li key={p}>
                <button
                  type="button"
                  onClick={() => addPick(p)}
                  className="h-9 border border-bone/15 px-3 text-[12px] text-bone/85 transition-colors hover:border-bone/50 hover:text-bone"
                >
                  {p}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
