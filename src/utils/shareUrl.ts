export function encodeLatex(preamble: string, body: string): string {
  const payload = JSON.stringify({ preamble, body });
  return btoa(unescape(encodeURIComponent(payload)));
}

export function decodeLatex(hash: string): { preamble: string; body: string } | null {
  try {
    const payload = decodeURIComponent(escape(atob(hash)));
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

export function buildShareUrl(preamble: string, body: string): string {
  const encoded = encodeLatex(preamble, body);
  return `${window.location.origin}${window.location.pathname}sandbox#${encoded}`;
}
