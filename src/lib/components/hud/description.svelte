<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Scroller from "$lib/components/scroller/scroller.svelte";
  import { activePage, descriptionInitialized } from "$lib/stores/store";
  import Line from "./line.svelte";
  import { slide } from "svelte/transition";

  const props = $props();
  const lineRefs: HTMLDivElement[] = [];
  const intersectingLineIndexes = $state<boolean[]>([]);
  let lines = $state<any[]>([]);
  const firstLineIndex = $derived.by(() =>
    $descriptionInitialized
      ? intersectingLineIndexes.findIndex((it) => it)
      : null,
  );
  let intersectionObserver: IntersectionObserver;

  onMount(async () => {
    const allLines = JSON.parse(JSON.stringify($activePage.lines));
    while (allLines.length) {
      lines.push(allLines.shift());
      await new Promise((r) => setTimeout(r, 100));
    }
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((it) => {
          const index = Number(it.target.getAttribute("data-index"));
          if (it.isIntersecting) {
            intersectingLineIndexes[index] = true;
          } else {
            delete intersectingLineIndexes[index];
          }
        });
      },
      {
        threshold: 1,
      },
    );
    lineRefs.forEach((it) => intersectionObserver.observe(it));
    $descriptionInitialized = true;
    lines = [...lines];
  });

  onDestroy(() => {
    $descriptionInitialized = false;
    intersectionObserver?.disconnect();
  });
</script>

<Scroller {...props}>
  {#each lines as line, i}
    <div bind:this={lineRefs[i]} data-index={i} transition:slide>
      <Line
        {...line}
        text={line.text}
        isLast={$descriptionInitialized && i === $activePage.lines.length - 1}
        isActive={$descriptionInitialized && firstLineIndex === i}
        height={props.height}
      />
    </div>
  {/each}
</Scroller>
