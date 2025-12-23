<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { article, activeLineIndex } from "$lib/stores/store";
  import { isPortrait, isMobile, scrolling, mode } from "$lib/stores/store";
  import SwipeUpIcon from "$lib/components/icons/swipe-up-icon.svelte";
  import MiddleButtonIcon from "$lib/components/icons/wheel-icon.svelte";

  let observer: IntersectionObserver;
  let container: HTMLElement;
  let sections = $state<HTMLElement[]>([]);
  let scrollTimeout: ReturnType<typeof setTimeout>;

  function handleScroll() {
    $scrolling = true;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      $scrolling = false;
    }, 150);
  }

  onMount(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            const index = Number(entry.target.getAttribute("data-index"));
            if (index < $article.lines.length) {
              $activeLineIndex = index;
            } else {
              window.location.replace("/");
            }
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        root: container,
        threshold: 0.1,
      },
    );
    sections.forEach((section) => observer.observe(section));
  });

  onDestroy(() => {
    observer.disconnect();
  });
</script>

<main
  bind:this={container}
  onscroll={handleScroll}
  class={[
    "story-container",
    $mode !== "Story" && "opacity-0 pointer-events-none",
  ]}
>
  {#each $article.lines as line, i}
    <section
      bind:this={sections[i]}
      data-index={i}
      class={["story-section", i === $activeLineIndex && "is-visible"]}
    >
      <div class="content">
        {#if line.title}
          <h2
            class="font-bold mb-2 tracking-tight text-slate-100 text-3xl outlined-text"
          >
            {line.title}
          </h2>
        {/if}
        <div
          class={"text-slate-200 px-2 outlined-text"}
          style="font-family: 'LXGW WenKai Mono TC', monospace;"
        >
          {line.text}
        </div>
        {#if !i || i === $article.lines.length - 1}
          <div
            class={"mt-4 animate-bounce mb-4 text-slate-400 flex items-center justify-center italic outlined-text opacity-75"}
          >
            {#if $isMobile}
              <SwipeUpIcon class="w-[1.5rem] h-[1.5rem]" />
            {:else}
              <MiddleButtonIcon class="w-[1.5rem] h-[1.5rem]" />
            {/if}
            {#if !i}
              <div class="pr-1">
                {#if $isMobile}上下滑動{:else}滑鼠滾動{/if}頁面以繼續
              </div>
            {:else}
              往下以回到總覽
            {/if}
          </div>
        {:else}
          <div
            class={[
              "w-24 h-0.5 bg-blue-500/50 mx-auto rounded-full",
              $isPortrait ? "mt-4 mb-6" : "mt-6 mb-8",
            ]}
          ></div>
        {/if}
      </div>
    </section>
  {/each}
  <section
    bind:this={sections[$article.lines.length]}
    data-index={$article.lines.length}
    class="story-section"
  >
    <div class="content pb-12">
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
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
  }

  .story-section {
    height: 100dvh;
    width: 100%;
    scroll-snap-align: start;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
  }

  .content {
    position: relative;
    z-index: 10;
    max-width: 750px;
    text-align: center;
    transform: translateY(2rem);
    white-space: pre-line;
    opacity: 0;
    transition: all 0.5s ease;
  }

  .story-section.is-visible .content {
    opacity: 1;
    transform: translateY(0);
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
</style>
