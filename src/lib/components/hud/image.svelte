<script lang="ts">
  import { resources } from "$lib/stores/store";
  const props = $props();
  const { imgUrl } = props;
</script>

<div class="pointer-events-none mt-9">
  <div
    class="rounded-md border-3 border-slate-200 box-content bg-black/50 p-2 transition-all"
  >
    {#if $resources[imgUrl]}
      <img
        src={$resources[imgUrl]}
        class="max-w-[min(1360px,calc(100vw-2.5rem))] object-cover backdrop-blur edge-feather max-h-[calc(100dvh-16rem)]"
        alt=""
      />
    {:else}
      <img src="/loading.svg" alt="" class="w-[4rem] h-[4rem] m-4" />
    {/if}
  </div>
</div>
