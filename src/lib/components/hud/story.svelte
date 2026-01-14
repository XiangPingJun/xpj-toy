<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { lines, activeLineIndex } from "$lib/stores/store";
  import { isMobile, mode } from "$lib/stores/store";
  import SwipeLeftIcon from "$lib/components/icons/swipe-left-icon.svelte";
  import MiddleButtonIcon from "$lib/components/icons/wheel-icon.svelte";
  import Btn from "./btn.svelte";
  import Image from "./image.svelte";

  let observer: IntersectionObserver;
  let container: HTMLElement;
  let sections = $state<HTMLElement[]>([]);

  let isWheelLocked = false;
  let wheelLockTimeout: ReturnType<typeof setTimeout>;

  function handleKeydown(e: KeyboardEvent) {
    if ($mode !== "Story") {
      return;
    }

    let nextIndex: number;
    switch (e.key) {
      case "ArrowRight":
      case "PageDown":
        nextIndex = Math.min($lines.length, $activeLineIndex + 1);
        break;
      case "ArrowLeft":
      case "PageUp":
        nextIndex = Math.max(0, $activeLineIndex - 1);
        break;
      default:
        return;
    }
    sections[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
    });
  }

  function handleWheel(e: WheelEvent) {
    if (isWheelLocked || $mode !== "Story") {
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
      sections[nextIndex]?.scrollIntoView({
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
            $activeLineIndex = Number(entry.target.getAttribute("data-index"));
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

    document.body.addEventListener(
      "wheel",
      (e) => {
        if ($mode !== "Story") {
          return;
        }
        handleWheel(e);
      },
      { passive: false },
    );
    document.body.addEventListener("keydown", handleKeydown, {
      passive: false,
    });
  });

  onDestroy(() => {
    observer.disconnect();
    clearTimeout(wheelLockTimeout);
    document.body.removeEventListener("wheel", handleWheel);
    document.body.removeEventListener("keydown", handleKeydown);
  });
</script>

{#snippet scrollHint()}
  {#if $isMobile}
    <div
      class="mb-1 text-slate-400 inline-flex items-center justify-center italic outlined-text-light h-bounce backdrop-blur-xs edge-feather py-0.5 px-1"
    >
      <SwipeLeftIcon class="w-[1.5rem] h-[1.5rem]" />(←左滑以繼續)
    </div>
  {:else}
    <div
      class="text-slate-400 inline-flex items-center justify-center outlined-text-light animate-bounce italic backdrop-blur-xs edge-feather py-0.5 px-1"
    >
      <MiddleButtonIcon class="w-[1.5rem] h-[1.5rem]" />(滾動滑鼠以繼續)
    </div>
  {/if}
{/snippet}

<div
  bind:this={container}
  class={[
    "story-container transition-all",
    $mode !== "Story" && "opacity-0 pointer-events-none",
  ]}
>
  {#each $lines as line, i}
    <section
      bind:this={sections[i]}
      data-index={i}
      class="story-section px-2 transition-all"
    >
      <div class="text-center pb-12 max-w-3xl">
        {#if !i}
          {@render scrollHint()}
        {/if}
        {#if line.title}
          <h2
            class="pb-1.5 px-1 text-slate-100 text-3xl outlined-text max-w-[calc(100vw-1rem)] mochiy-pop-p-one whitespace-pre-line"
          >
            {line.title}
          </h2>
        {/if}
        <div
          class="text-slate-200 outlined-text whitespace-pre-line max-w-[calc(100vw-1rem)]"
        >
          {line.text}
        </div>
        {#if i === $lines.length - 1}
          <Btn class="mt-1" onclick={() => window.location.assign("/")}
            >(↩ 返回目錄)</Btn
          >
        {/if}
      </div>
      {#if line.imgUrl}
        <Image imgUrl={line.imgUrl} />
      {/if}
    </section>
  {/each}
</div>

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
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
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
