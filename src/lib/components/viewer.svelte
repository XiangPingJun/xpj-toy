<script lang="ts">
  import GsViewer from "$lib/components/gs-viewer/gs-viewer.svelte";
  import Hud from "$lib/components/hud/hud.svelte";
  import Media from "$lib/components/media.svelte";
  import Panorama from "$lib/components/panorama/panorama.svelte";
  import { resources, subjectUrl } from "$lib/stores/store";
</script>

{#snippet loading()}
  <div
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl"
  >
    <div class="flex items-center">
      <img src="/loading.svg" alt="" class="w-[4rem] h-[4rem]" />
    </div>
  </div>
{/snippet}

{#if !$resources[$subjectUrl]}
  <div class="bg-overlay"></div>
  {@render loading()}
{:else}
  {#key $subjectUrl}
    {#if $subjectUrl.endsWith(".sog")}
      <GsViewer />
    {:else}
      <Panorama />
    {/if}
  {/key}
  <div class="bg-overlay"></div>
  <Hud />
  <Media />
{/if}

<style>
  .bg-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100dvh;
    background: linear-gradient(
      to bottom,
      rgba(15, 23, 42, 0) 60%,
      rgba(15, 23, 42, 0.5) 80%,
      rgba(15, 23, 42, 0.9) 100%
    );
    transition: opacity 0.5s ease;
    pointer-events: none;
  }
</style>
