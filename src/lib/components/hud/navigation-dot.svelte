<script lang="ts">
  import { lines, activeLineIndex, mode } from "$lib/stores/store";

  const DOT_SIZE = 0.5; // rem
  const DOT_GAP = 0.75; // rem
  const DOT_STEP = DOT_SIZE + DOT_GAP;

  const trackOffset = $derived.by(() => {
    if ($activeLineIndex < 4) {
      return 0;
    }
    if ($activeLineIndex > $lines.length - 4) {
      return (-$lines.length + 4) * DOT_STEP + 4.25;
    }
    return -$activeLineIndex * DOT_STEP + 4.25;
  });

  function handleDotClick(index: number) {
    $activeLineIndex = index;
    const section = document.querySelector(`[data-index="${index}"]`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", inline: "start" });
    }
  }
</script>

<nav
  class={[
    "navigation-dots",
    $mode !== "Story" && "opacity-0 pointer-events-none",
  ]}
>
  <div class="viewport">
    <div class="track" style="transform: translateX({trackOffset}rem)">
      {#each $lines as _, index}
        <button
          class={["dot", $activeLineIndex === index && "active"]}
          onclick={() => handleDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
        ></button>
      {/each}
    </div>
  </div>
</nav>

<style>
  .navigation-dots {
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 50;
    transition: opacity 0.3s ease;
    opacity: 0.8;
  }

  .viewport {
    position: relative;
    width: 9rem;
    height: 1.5rem;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .track {
    display: flex;
    gap: 0.75rem;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.4);
    border: none;
    cursor: pointer;
    flex-shrink: 0;
    padding: 0;
    outline: 0.1rem solid transparent;
    transition:
      background-color 0.5s,
      outline-color 0.5s;
  }

  .dot:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }

  .dot.active {
    background-color: var(--color-blue-400);
    outline: 0.1rem solid var(--color-blue-400);
    outline-offset: 0.1rem;
  }
</style>
