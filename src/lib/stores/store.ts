import { writable, derived } from 'svelte/store';

export const article = writable({} as Record<string, any>);
export const activeLineIndex = writable(0);
export const activeLine = derived(
  [article, activeLineIndex],
  ([$article, $activeLineIndex]) => $article.lines[$activeLineIndex],
);
export const subjectUrl = derived(
  [article, activeLineIndex],
  ([$article, $activeLineIndex]) => {
    for (let i = $activeLineIndex; i >= 0; i--) {
      if ($article.lines[i].subjectUrl) {
        return $article.lines[i].subjectUrl;
      }
    }
  },
);

export const resources = writable({} as Record<string, string | null>);

export const autoRotate = writable(true);
let autoRotateTimer: ReturnType<typeof setTimeout>;
autoRotate.subscribe((val) => {
  if (!val) {
    clearTimeout(autoRotateTimer);
    autoRotateTimer = setTimeout(() => {
      autoRotate.set(true);
    }, 4000);
  }
});

export const isMobile = writable(false);
export const isPortrait = writable(false);

export const mode = writable<"Story" | "Inspect">("Story");

export const scrolling = writable(false);