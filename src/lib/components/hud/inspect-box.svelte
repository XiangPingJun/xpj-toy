<script lang="ts">
  import { mode, isMobile, activePage } from "$lib/stores/store";
  import BorderBox from "./border-box.svelte";
  import LeftButtonIcon from "../icons/left-button-icon.svelte";
  import MiddleButtonIcon from "../icons/middle-button-icon.svelte";
  import RightButtonIcon from "../icons/right-button-icon.svelte";
  import VrGlassIcon from "../icons/vr-glass-icon.svelte";
</script>

{#snippet upper()}
  [<VrGlassIcon class="w-[1em] h-[1em] inline" />調整視角]
{/snippet}

{#snippet content()}
  <div
    class="bg-black/75 border-white box-content border-l-3 border-r-3 whitespace-pre-line px-4"
  >
    {#if $activePage.type === "pan"}
      <LeftButtonIcon class="w-[1em] h-[1em] inline" />按住左鍵拖曳旋轉
    {:else if $activePage.type === "splat"}
      {#if $isMobile}{:else}
        <LeftButtonIcon class="w-[1em] h-[1em] inline" />按住左鍵拖曳旋轉
        <MiddleButtonIcon class="w-[1em] h-[1em] inline" />滾動滾輪縮放
        <RightButtonIcon class="w-[1em] h-[1em] inline" />按住右鍵拖曳平移
      {/if}
    {/if}
  </div>
{/snippet}

{#snippet lower()}
  [<button
    class="text-blue-400 hover:text-blue-300 cursor-pointer flex items-center"
    onclick={() => ($mode = "Description")}
  >
    <i class="las la-comment"></i>
    顯示內文
  </button>]
{/snippet}

<BorderBox {upper} {content} {lower} />
