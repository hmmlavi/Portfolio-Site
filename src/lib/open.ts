/**
 * Open in new tab. If the browser refuses (sandbox, blocker),
 * we never fall back to same-tab navigation — that avoids the
 * "site blocked" error in sandboxed preview frames.
 */
export function openExternal(url: string): boolean {
  const w = window.open(url, '_blank', 'noopener,noreferrer');
  return w !== null;
}
