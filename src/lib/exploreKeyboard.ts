/**
 * Keyboard controller for the explorer, as a small vanilla JS module.
 * It listens globally while mounted and reports intents upward through a
 * single callback; the React layer owns all state so nothing is duplicated.
 *
 * Shortcuts:
 *   /            focus the search field
 *   ArrowUp/Down move the highlighted project (list focus)
 *   ArrowLeft/Right move through projects once a detail is open
 *   Enter        open the highlighted project
 *   Escape       close the detail panel / blur search
 */
export interface KeyboardIntent {
  action:
    | 'focus-search'
    | 'move-next'
    | 'move-prev'
    | 'nav-next'
    | 'nav-prev'
    | 'enter'
    | 'escape';
}

export function attachExplorerKeyboard(orchestrate: (i: KeyboardIntent) => void): () => void {
  const handler = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement | null;
    const typing =
      !!target?.closest?.('input, textarea, [contenteditable="true"], select');

    // "/" focuses search unless the user is already typing somewhere.
    if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      orchestrate({ action: 'focus-search' });
      return;
    }
    if (typing && e.key !== 'Escape') return;

    switch (e.key) {
      case 'Escape':
        orchestrate({ action: 'escape' });
        break;
      case 'Enter':
        if (!typing) orchestrate({ action: 'enter' });
        break;
      case 'ArrowDown':
        if (!typing) {
          e.preventDefault();
          orchestrate({ action: 'move-next' });
        }
        break;
      case 'ArrowUp':
        if (!typing) {
          e.preventDefault();
          orchestrate({ action: 'move-prev' });
        }
        break;
      case 'ArrowRight':
        if (!typing) {
          e.preventDefault();
          orchestrate({ action: 'nav-next' });
        }
        break;
      case 'ArrowLeft':
        if (!typing) {
          e.preventDefault();
          orchestrate({ action: 'nav-prev' });
        }
        break;
    }
  };

  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}
