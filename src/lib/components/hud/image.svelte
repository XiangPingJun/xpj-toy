<script lang="ts">
  import { resources } from "$lib/stores/store";
  import { isPortrait } from "$lib/stores/store";

  const props = $props();
  const { imgUrl } = props;
</script>

{#if imgUrl && $resources[imgUrl]}
  <div class={["pointer-events-none", $isPortrait ? "top-3" : "top-9"]}>
    <div
      class="backdrop-blur-xs absolute top-[0.2rem] h-[calc(100%-1rem)] -z-10"
    ></div>
    <div
      class="rounded-md border-3 border-slate-200 box-content bg-black/50 p-2 m-2"
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
