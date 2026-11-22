/** Smooth-scroll to a section by id, honouring prefers-reduced-motion, and record it in history. */
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToId(id: string, { push = true }: { push?: boolean } = {}) {
  const el = document.getElementById(id);
  if (!el) return false;
  if (push && window.location.hash !== `#${id}`) history.pushState(null, "", `#${id}`);
  // scroll-margin-top on the target (see .anchor in globals.css) keeps the heading clear of the sticky header
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  return true;
}

/** Release the page scroll lock that dialogs/menus set on <html>. */
export function unlockScroll() {
  document.documentElement.style.overflow = "";
}
