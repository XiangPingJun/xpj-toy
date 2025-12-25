<script lang="ts">
  import { resources, isPortrait } from "$lib/stores/store";
  const props = $props();
  const { imgUrl } = props;
</script>

{#if imgUrl && $resources[imgUrl]}
  <div class={["pointer-events-none", $isPortrait ? "mt-3" : "mt-9"]}>
    <div
      class="backdrop-blur-xs absolute top-[0.2rem] h-[calc(100%-1rem)] -z-10"
    ></div>
    <div
      class="rounded-md border-3 border-slate-200 box-content bg-black/50 p-2"
    >
      <img
        src={$resources[imgUrl]}
        class="max-w-[min(1360px,calc(100vw-2.5rem))] object-cover backdrop-blur-sm blur-bg max-h-[calc(100dvh-20rem)]"
        alt=""
      />
    </div>
  </div>
{/if}
