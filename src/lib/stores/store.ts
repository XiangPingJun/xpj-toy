import { writable, derived } from 'svelte/store';

export const splatPov = writable('');
export const panPov = writable('');

export const resources = writable({} as Record<string, string | null>);
export const pages = writable([] as {
  title?: string,
  type: 'splat' | 'pan',
  url: string,
  lines: {
    text: string,
    pov: string,
    imgurl?: string,
    videourl?: string,
  }[],
}[]);

export const descriptionInitialized = writable(false);

export const activePageIndex = writable(0);
export const activePage = derived(
  [pages, activePageIndex],
  ([$pages, $activePageIndex]) => $pages[$activePageIndex],
);

export const imgUrl = writable('');
export const videoUrl = writable('');

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

export const mode = writable<"Description" | "Inspect">("Description");
