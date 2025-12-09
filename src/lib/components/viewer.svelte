<script lang="ts">
  import GsViewer from "$lib/components/gs-viewer/gs-viewer.svelte";
  import Hud from "$lib/components/hud/hud.svelte";
  import Media from "$lib/components/media.svelte";
  import Panorama from "$lib/components/panorama/panorama.svelte";
  import {
    resources,
    activePage,
    descriptionInitialized,
  } from "$lib/stores/store";
</script>

{#snippet loading()}
  <div
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl"
  >
    <div class="flex items-center gap-1">
      <img src="/loading.svg" alt="" class="w-[4rem] h-[4rem]" />
    </div>
  </div>
{/snippet}

{#if !$resources[$activePage.url]}
  {@render loading()}
{:else}
  {#if !$descriptionInitialized}
    {@render loading()}
  {/if}
  {#if $activePage?.type === "splat"}
    <GsViewer class={[!$descriptionInitialized && "opacity-0"]} />
  {:else if $activePage?.type === "pan"}
    <Panorama class={[!$descriptionInitialized && "opacity-0"]} />
  {/if}
  <Hud />
  <Media />
{/if}
