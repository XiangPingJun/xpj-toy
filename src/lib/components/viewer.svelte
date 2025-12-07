<script lang="ts">
  import GsViewer from "$lib/components/gs-viewer/gs-viewer.svelte";
  import Hud from "$lib/components/hud/hud.svelte";
  import Media from "$lib/components/media.svelte";
  import Panorama from "$lib/components/panorama/panorama.svelte";
  import { activePageIndex, resources, activePage } from "$lib/stores/store";

  $activePageIndex = 0;
</script>

{#if !$resources[$activePage.url]}
  <div
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl"
  >
    <div class="flex items-center gap-1">
      <img src="/loading.svg" alt="" class="w-[6rem] h-[6rem]" />
    </div>
  </div>
{:else}
  {#if $activePage?.type === "splat"}
    <GsViewer />
  {:else if $activePage?.type === "pan"}
    <Panorama />
  {/if}
  <Media />
  <Hud />
{/if}
