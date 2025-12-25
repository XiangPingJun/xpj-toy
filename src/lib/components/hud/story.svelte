<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { lines, activeLineIndex } from "$lib/stores/store";
  import { isMobile, mode } from "$lib/stores/store";
  import SwipeLeftIcon from "$lib/components/icons/swipe-left-icon.svelte";
  import MiddleButtonIcon from "$lib/components/icons/wheel-icon.svelte";
  import Image from "./image.svelte";

  let observer: IntersectionObserver;
  let container: HTMLElement;
  let sections = $state<HTMLElement[]>([]);

  let isWheelLocked = false;
  let wheelLockTimeout: ReturnType<typeof setTimeout>;

  function handleWheel(e: WheelEvent) {
    if (isWheelLocked) {
      e.preventDefault();
      return;
    }

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

    if (Math.abs(delta) < 10) return;

    e.preventDefault();
    isWheelLocked = true;

    const direction = delta > 0 ? 1 : -1;
    const nextIndex = Math.max(
      0,
      Math.min($lines.length, $activeLineIndex + direction),
    );

    if (nextIndex !== $activeLineIndex && sections[nextIndex]) {
      sections[nextIndex].scrollIntoView({
        behavior: "smooth",
        inline: "start",
      });
    }

    clearTimeout(wheelLockTimeout);
    wheelLockTimeout = setTimeout(() => {
      isWheelLocked = false;
    }, 750);
  }

  onMount(() => {
    observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            const index = Number(entry.target.getAttribute("data-index"));
            $activeLineIndex = index;
          } else {
            entry.target.classList.remove("is-visible");
          }
        }),
      {
        root: container,
        threshold: 0.1,
      },
    );
    sections.forEach((section) => observer.observe(section));
  });

  onDestroy(() => {
    observer.disconnect();
    clearTimeout(wheelLockTimeout);
  });
</script>

{#snippet scrollHint()}
  {#if $isMobile}
    <div
      class="mb-3 text-slate-300 flex items-center justify-center italic outlined-text-light opacity-75 h-bounce"
    >
      <SwipeLeftIcon class="w-[1.5rem] h-[1.5rem]" />(左滑以繼續)
    </div>
  {:else}
    <div
      class="mb-1 text-slate-300 flex items-center justify-center outlined-text-light opacity-75 animate-bounce italic"
    >
      <MiddleButtonIcon class="w-[1.5rem] h-[1.5rem]" />(滾動滑鼠以繼續)
    </div>
  {/if}
{/snippet}

<main
  bind:this={container}
  onwheel={handleWheel}
  class={[
    "story-container transition-all",
    $mode !== "Story" && "opacity-0 pointer-events-none",
  ]}
>
  {#each $lines as line, i}
    <section
      bind:this={sections[i]}
      data-index={i}
      class={"story-section px-2 transition-all"}
    >
      <div class="text-center">
        {#if !i}
          {@render scrollHint()}
        {/if}
        {#if line.title}
          <h2
            class="font-bold mb-2 tracking-tight text-slate-100 text-3xl outlined-text max-w-[calc(100vw-1rem)]"
          >
            {line.title}
          </h2>
        {/if}
        <div
          class="text-slate-200 outlined-text mb-12 whitespace-pre-line LXGW max-w-[calc(100vw-1rem)]"
        >
          {line.text}
        </div>
      </div>
      <Image imgUrl={line.imgUrl} />
    </section>
  {/each}
</main>

<style>
  .story-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100dvh;
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    display: flex;
    flex-direction: row;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }

    .story-section {
      min-width: 100vw;
      max-width: 100vw;
      min-height: 100dvh;
      max-height: 100dvh;
      flex-shrink: 0;
      scroll-snap-align: start;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;
      scroll-snap-stop: always;
      max-width: 750px;
    }

    .outlined-text {
      text-shadow:
        2px 2px 0 rgba(30, 41, 59, 0.75),
        -2px 2px 0 rgba(30, 41, 59, 0.75),
        2px -2px 0 rgba(30, 41, 59, 0.75),
        -2px -2px 0 rgba(30, 41, 59, 0.75),
        0px 2px 0 rgba(30, 41, 59, 0.75),
        0px -2px 0 rgba(30, 41, 59, 0.75),
        2px 0px 0 rgba(30, 41, 59, 0.75),
        -2px 0px 0 rgba(30, 41, 59, 0.75);
    }

    .h-bounce {
      animation: h-bounce 1s infinite;
    }
  }

  @keyframes h-bounce {
    0%,
    100% {
      transform: translateX(0.25rem);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: none;
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }
</style>
