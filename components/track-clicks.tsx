"use client";

import { useEffect } from "react";

function slug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 60);
}

function autoActionFor(el: HTMLElement): string {
  if (el instanceof HTMLAnchorElement) {
    const href = el.getAttribute("href") ?? "";
    if (href.startsWith("tel:")) return "call_link";
    if (href.startsWith("mailto:")) return "email_link";
    if (href.startsWith("#")) return `anchor_${slug(href.slice(1)) || "top"}`;
    if (/^https?:\/\//i.test(href)) {
      try {
        const host = new URL(href).host.replace(/^www\./, "");
        return `external_${slug(host)}`;
      } catch {
        return "external_link";
      }
    }
    if (href.startsWith("/")) {
      const path = href.split(/[?#]/)[0];
      return `nav_${slug(path) || "root"}`;
    }
  }
  const label =
    el.getAttribute("aria-label") ||
    (el as HTMLButtonElement).name ||
    (el.textContent ?? "").trim();
  const s = label ? slug(label) : "";
  if (s) return `${el.tagName.toLowerCase()}_${s}`;
  return `${el.tagName.toLowerCase()}_unnamed`;
}

export function TrackClicks() {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      // Prefer explicit data-track. Fall back to any <a>/<button> ancestor.
      let el = target.closest<HTMLElement>("[data-track]");
      let action: string | undefined = el?.dataset.track;
      let auto = false;

      if (!el || !action) {
        el = target.closest<HTMLElement>("a, button");
        if (!el) return;
        action = autoActionFor(el);
        auto = true;
      }

      const sectionEl = el.closest<HTMLElement>("[data-track-section]");
      const section = sectionEl?.dataset.trackSection;

      const modalEl = el.closest<HTMLElement>("[data-track-modal], [role='dialog']");
      const inModal = Boolean(modalEl);

      const variant = el.dataset.trackVariant;
      const indexRaw = el.dataset.trackIndex;
      const index = indexRaw !== undefined ? Number(indexRaw) : undefined;

      const href = el instanceof HTMLAnchorElement ? el.getAttribute("href") ?? undefined : undefined;
      const text = (el.textContent ?? "").trim().slice(0, 100) || undefined;

      const params: Record<string, unknown> = {
        button_id: section ? `${section}.${action}` : action,
        button_action: action,
        page_path: window.location.pathname,
      };
      if (section) params.button_section = section;
      if (variant) params.button_variant = variant;
      if (inModal) params.button_in_modal = true;
      if (auto) params.button_auto = true;
      if (text) params.button_text = text;
      if (href) params.button_href = href;
      if (index !== undefined && !Number.isNaN(index)) params.button_index = index;

      window.gtag?.("event", "button_click", params);
    };

    document.addEventListener("click", handler, { capture: true, passive: true });
    return () => document.removeEventListener("click", handler, { capture: true });
  }, []);

  return null;
}
