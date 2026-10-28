/**
 * Returns a same-site path to redirect to after sign-in, or "/" when the
 * value could send the browser to another origin.
 */
export function safeCallbackUrl(raw: unknown): string {
  if (typeof raw !== "string") return "/";
  const value = raw.trim();
  if (!value.startsWith("/")) return "/";
  if (value.startsWith("//") || value.startsWith("/\\")) return "/";
  if (/[\u0000-\u001f]/.test(value)) return "/";
  return value;
}
