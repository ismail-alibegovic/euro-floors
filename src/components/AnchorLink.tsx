"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { scrollToId } from "@/lib/scroll";

/**
 * A real `<a href="/#id">` (works without JS, middle-click, from other pages) that, on the one-page
 * home, scrolls smoothly in place and records the hash in history instead of reloading.
 */
export function AnchorLink({
  id,
  onNavigate,
  onClick,
  ...rest
}: { id: string; onNavigate?: () => void } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (window.location.pathname !== "/" || !document.getElementById(id)) return; // other page: normal navigation
    e.preventDefault();
    onNavigate?.();
    // let a closing dialog/menu release its scroll lock before we scroll
    requestAnimationFrame(() => scrollToId(id));
  };
  return <a href={`/#${id}`} onClick={handle} {...rest} />;
}
