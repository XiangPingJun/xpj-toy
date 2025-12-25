<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { lines, activeLineIndex } from "$lib/stores/store";
  import { isMobile, scrolling, mode } from "$lib/stores/store";
  import SwipeIcon from "$lib/components/icons/swipe-icon.svelte";
  import MiddleButtonIcon from "$lib/components/icons/wheel-icon.svelte";
  import Image from "./image.svelte";

  let observer: IntersectionObserver;
  let container: HTMLElement;
  let sections = $state<HTMLElement[]>([]);
  let scrollTimeout: ReturnType<typeof setTimeout>;

  let isWheelLocked = false;
  let wheelLockTimeout: ReturnType<typeof setTimeout>;

  function handleScroll() {
    $scrolling = true;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      $scrolling = false;
    }, 150);
  }

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
            if (index < $lines.length) {
              $activeLineIndex = index;
            } else {
              window.location.replace("/");
            }
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

{#snippet scrollHint(isFirst: boolean)}
  {#if $isMobile}
    <div
      class="mb-3 text-slate-400 flex items-center justify-center italic outlined-text opacity-75 h-bounce"
    >
      <SwipeIcon class="w-[1.5rem] h-[1.5rem]" />
      {#if isFirst}
        <div class="pr-1">滑動頁面以繼續</div>
      {:else}
        繼續滑動以前往總覽頁面
      {/if}
    </div>
  {:else}
    <div
      class="mb-2 text-slate-400 flex items-center justify-center italic outlined-text opacity-75 animate-bounce"
    >
      <MiddleButtonIcon class="w-[1.5rem] h-[1.5rem]" />
      {#if isFirst}
        <div class="pr-1">滾動滑鼠以繼續</div>
      {:else}
        繼續滑動以前往總覽頁面
      {/if}
    </div>
  {/if}
{/snippet}

<main
  bind:this={container}
  onscroll={handleScroll}
  onwheel={handleWheel}
  class={[
    "story-container",
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
        {#if !i || i === $lines.length - 1}
          {@render scrollHint(!i)}
        {/if}
        {#if line.title}
          <h2
            class="font-bold mb-2 tracking-tight text-slate-100 text-3xl outlined-text"
          >
            {line.title}
          </h2>
        {/if}
        <div
          class={"text-slate-200 outlined-text mb-12 whitespace-pre-line"}
          style="font-family: 'LXGW WenKai Mono TC', monospace;"
        >
          {line.text}
        </div>
      </div>
      <Image imgUrl={line.imgUrl} />
    </section>
  {/each}
  <section
    bind:this={sections[$lines.length]}
    data-index={$lines.length}
    class="story-section"
  >
    <div class="pb-12">
      <img src="/loading.svg" alt="" class="w-[1.5rem] h-[1.5rem]" />
    </div>
  </section>
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
        2px 2px 0 rgba(30, 41, 59, 0.25),
        -2px 2px 0 rgba(30, 41, 59, 0.25),
        2px -2px 0 rgba(30, 41, 59, 0.25),
        -2px -2px 0 rgba(30, 41, 59, 0.25),
        0px 2px 0 rgba(30, 41, 59, 0.25),
        0px -2px 0 rgba(30, 41, 59, 0.25),
        2px 0px 0 rgba(30, 41, 59, 0.25),
        -2px 0px 0 rgba(30, 41, 59, 0.25);
    }

    .h-bounce {
      animation: h-bounce 1s infinite;
    }
  }

  @keyframes h-bounce {
    0%,
    100% {
      transform: translateX(-1%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: none;
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }
</style>
