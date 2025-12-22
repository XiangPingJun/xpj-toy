<script lang="ts">
  import { activeLine, resources } from "$lib/stores/store";
  import { isPortrait, mode, scrolling } from "$lib/stores/store";
  import { fade } from "svelte/transition";

  let imgUrl = $state("");
  let videoUrl = $state("");

  $effect(() => {
    (async () => {
      if (!$scrolling && $activeLine?.imgUrl) {
        await new Promise((r) => setTimeout(r, 750));
        imgUrl = $activeLine.imgUrl;
      } else {
        imgUrl = "";
      }
      if (!$scrolling && $activeLine?.videoUrl) {
        await new Promise((r) => setTimeout(r, 750));
        videoUrl = $activeLine.videoUrl;
      } else {
        videoUrl = "";
      }
    })();
  });
</script>

{#if (imgUrl && $resources[imgUrl]) || (videoUrl && $resources[videoUrl])}
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
      {#if $resources[imgUrl]}
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
      {:else if $resources[videoUrl]}
        <video
          src={$resources[videoUrl]}
          class={[
            "max-w-[min(1360px,calc(100vw-2rem))] object-cover backdrop-blur-sm blur-bg",
            $isPortrait
              ? "max-h-[calc(100dvh-20rem)]"
              : "max-h-[calc(100dvh-22rem)]",
          ]}
          autoplay
          muted
          playsinline
          loop
        ></video>
      {/if}
    </div>
  </div>
{/if}
