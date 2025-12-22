<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { article, activeLineIndex } from "$lib/stores/store";
  import { isPortrait, isMobile, scrolling, mode } from "$lib/stores/store";

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
            class={[
              "font-bold mb-2 tracking-tight text-white",
              $isMobile ? "text-2xl" : "text-4xl",
            ]}
          >
            {line.title}
          </h2>
        {/if}
        <div class={["text-slate-200 px-2", !$isMobile && "text-lg"]}>
          {line.text}
          {#if i === $article.lines.length - 1}
            <div class="text-slate-400 italic mt-2">(往下以回到一覽)</div>
          {/if}
        </div>
        {#if i === 0 || i === $article.lines.length - 1}
          <div class="mt-4 animate-bounce opacity-50 mb-4">
            <svg
              class="w-6 h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
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
</style>
