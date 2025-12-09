<script lang="ts">
  import { onMount } from "svelte";

  const props = $props();
  let container: HTMLDivElement;
  let lastExecutionTime = 0;
  const throttleInterval = 500;

  onMount(() => {
    container.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();

        const now = Date.now();
        if (now - lastExecutionTime < throttleInterval) {
          return;
        }
        lastExecutionTime = now;

        container.scrollBy({ top: Math.sign(event.deltaY) });
      },
      { passive: false },
    );

    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowDown":
        case "PageDown":
          container.scrollBy({ top: 1 });
          break;
        case "ArrowUp":
        case "PageUp":
          container.scrollBy({ top: -1 });
          break;
      }
    });
  });
</script>

<div class={props.class}>
  <div
    class="scrollbar-container pl-4 pr-2 mr-2"
    style:height={props.height}
    bind:this={container}
    tabindex="-1"
  >
    {@render props.children()}
  </div>
</div>

<style>
  .scrollbar-container {
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
  }

  .scrollbar-container::-webkit-scrollbar {
    width: 0.5rem;
  }

  .scrollbar-container::-webkit-scrollbar-track {
    background-color: #333;
    border-radius: 0.5rem;
  }

  .scrollbar-container::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 0.5rem;
  }
</style>
