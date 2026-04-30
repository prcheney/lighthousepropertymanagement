export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, {
    page_path: window.location.pathname,
    ...params,
  });
}
