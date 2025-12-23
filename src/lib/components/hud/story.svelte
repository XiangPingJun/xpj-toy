<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { article, activeLineIndex } from "$lib/stores/store";
  import { isPortrait, isMobile, scrolling, mode } from "$lib/stores/store";
  import SwipeUpIcon from "$lib/components/icons/swipe-up-icon.svelte";
  import MiddleButtonIcon from "$lib/components/icons/wheel-icon.svelte";

  let observer: IntersectionObserver;
  let container: HTMLElement;
  let sections = $state<HTMLElement[]>([]);

  onMount(() => {
    observer = new IntersectionObserver(
      (entries) => {
        $scrolling = true;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (index < $article.lines.length) {
              $activeLineIndex = index;
            } else {
              window.location.replace("/");
            }
            $scrolling = false;
          }
        });
      },
      {
        root: container,
        threshold: 1,
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
            class="font-bold mb-2 tracking-tight text-white-200 text-3xl outlined-text"
            style="font-family: 'Chiron Hei HK', sans-serif;"
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
            class={"mt-4 animate-bounce mb-4 text-slate-400 flex items-center justify-center italic outlined-text text-lg"}
          >
            {#if $isMobile}
              <SwipeUpIcon
                class="w-[1rem] h-[1rem]"
              />{#if !i}滑動頁面以繼續{:else}往下以回到一覽{/if}
            {:else}
              <MiddleButtonIcon
                class="w-[1rem] h-[1rem]"
              />{#if !i}捲動頁面以繼續{:else}往下以回到一覽{/if}
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
    <div class="content"></div>
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
