<script lang="ts">
  import { imgUrl, videoUrl, resources } from "$lib/stores/store";
  import { isPortrait, mode } from "$lib/stores/store";
  import CloseIcon from "$lib/components/icons/close-icon.svelte";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";

  let mounted = $state(false);
  onMount(() => {
    mounted = true;
  });
</script>

{#if mounted && (($imgUrl && $resources[$imgUrl]) || $videoUrl)}
  <div
    class={[
      $mode === "Description"
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none",
      "fixed left-1/2 -translate-x-1/2 top-3 transition-all",
    ]}
    transition:fly={{ y: 24 }}
  >
    <div
      class="backdrop-blur-xs absolute top-[0.2rem] w-full h-[calc(100%-1rem)] -z-10"
    ></div>
    <div
      class="rounded-tl-md rounded-tr-md border-3 border-b-0 border-white box-content bg-black/50 p-2 pb-0"
    >
      {#if $resources[$imgUrl]}
        <img
          src={$resources[$imgUrl]}
          class={[
            "max-w-[min(1360px,calc(100vw-2rem))] object-cover backdrop-blur-sm blur-bg",
            $isPortrait
              ? "max-h-[calc(100dvh-20rem)]"
              : "max-h-[calc(100dvh-22rem)]",
          ]}
          alt=""
        />
      {:else if $resources[$videoUrl]}
        <video
          src={$resources[$videoUrl]}
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
          controls
        >
          <track kind="captions" />
        </video>
      {/if}
    </div>
    <div class="flex">
      <div
        class="rounded-bl-md border-b-3 border-l-3 border-white box-content h-[1em] bg-black/50 flex-grow"
      ></div>
      <div class="bg-black/50 pt-1.25 px-0.5 font-bold flex items-center">
        [<button
          class="text-blue-400 hover:text-blue-300 cursor-pointer flex items-center"
          onclick={() => {
            $imgUrl = "";
            $videoUrl = "";
          }}
          tabindex="-1"><CloseIcon />關閉1</button
        >]
      </div>
      <div
        class="rounded-br-md border-b-3 border-r-3 border-white box-content h-[1em] bg-black/50 w-[2rem]"
      ></div>
    </div>
  </div>
{/if}
