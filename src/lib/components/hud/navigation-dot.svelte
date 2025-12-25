<script lang="ts">
  import { lines, activeLineIndex, mode } from "$lib/stores/store";
  import { fade } from "svelte/transition";

  const min = $derived.by(() => {
    if ($activeLineIndex < 4) {
      return 0;
    } else if ($activeLineIndex > $lines.length - 5) {
      return $lines.length - 9;
    }
    return $activeLineIndex - 4;
  });
  const max = $derived.by(() => {
    if ($activeLineIndex < 4) {
      return 8;
    } else if ($activeLineIndex > $lines.length - 5) {
      return $lines.length - 1;
    }
    return $activeLineIndex + 4;
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
  {#each $lines as _, index}
    {#if index >= min && index <= max}
      <button
        transition:fade
        class={["dot", $activeLineIndex === index && "active"]}
        onclick={() => handleDotClick(index)}
        aria-label=" "
      ></button>
    {/if}
  {/each}
</nav>

<style>
  .navigation-dots {
    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    z-index: 50;
    transition: opacity 0.3s ease;
  }

  .dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.4);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
  }

  .dot:hover {
    background-color: rgba(255, 255, 255, 0.7);
    transform: scale(1.3);
  }

  .dot.active {
    background-color: rgba(59, 130, 246, 1);
    transform: scale(1.5);
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
  }

  @media (max-width: 768px) {
    .navigation-dots {
      bottom: 1rem;
      gap: 0.4rem;
    }

    .dot {
      width: 0.4rem;
      height: 0.4rem;
    }
  }
</style>
