export function normaliseWebsite(value: string): string | null {
  const raw = value.trim();
  if (!raw) return null;
  try {
    const url = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : "https://" + raw);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || !url.hostname.includes(".") || url.port) return null;
    if (!/^[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z][a-z0-9-]+$/i.test(url.hostname)) return null;
    url.hash = "";
    return url.href;
  } catch {
    return null;
  }
}
