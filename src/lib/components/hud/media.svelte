<script lang="ts">
  import { activeLine, resources } from "$lib/stores/store";
  import { isPortrait, mode, scrolling } from "$lib/stores/store";
  import { fade } from "svelte/transition";

  let imgUrl = $state("");

  $effect(() => {
    (async () => {
      if (!$scrolling && $activeLine?.imgUrl) {
        imgUrl = $activeLine.imgUrl;
      } else {
        imgUrl = "";
      }
    })();
  });
</script>

{#if imgUrl && $resources[imgUrl]}
  <div
    class={[
      $mode === "Story"
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none",
      "fixed left-1/2 -translate-x-1/2 transition-all pointer-events-none",
      $isPortrait ? "top-3" : "top-9",
    ]}
    in:fade
  >
    <div
      class="backdrop-blur-xs absolute top-[0.2rem] w-full h-[calc(100%-1rem)] -z-10"
    ></div>
    <div
      class="rounded-md border-3 border-slate-200 box-content bg-black/50 p-2"
    >
      <img
        src={$resources[imgUrl]}
        class={[
          "max-w-[min(1360px,calc(100vw-2rem))] object-cover backdrop-blur-sm blur-bg",
          $isPortrait
            ? "max-h-[calc(100dvh-20rem)]"
            : "max-h-[calc(100dvh-22rem)]",
        ]}
        alt=""
      />
    </div>
  </div>
{/if}
