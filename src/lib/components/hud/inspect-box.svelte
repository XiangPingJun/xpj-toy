<script lang="ts">
  import { mode, isMobile, activePage } from "$lib/stores/store";
  import BorderBox from "./border-box.svelte";
  import LeftButtonIcon from "$lib/components/icons/left-button-icon.svelte";
  import MiddleButtonIcon from "$lib/components/icons/wheel-icon.svelte";
  import RightButtonIcon from "$lib/components/icons/right-button-icon.svelte";
  import VrGlassIcon from "$lib/components/icons/vr-glass-icon.svelte";
  import CommentIcon from "$lib/components/icons/comment-icon.svelte";
  import SwipeIcon from "$lib/components/icons/swipe-icon.svelte";
  import FingerDragIcon from "$lib/components/icons/finger-drag-icon.svelte";
</script>

{#snippet upper()}
  [<VrGlassIcon />調整視角]
{/snippet}

{#snippet content()}
  <div
    class="bg-black/75 border-white box-content border-l-3 border-r-3 whitespace-pre-line px-4 text-gray-400 italic"
  >
    {#if $activePage.type === "pan"}
      {#if $isMobile}
        <SwipeIcon />手指滑動旋轉
      {:else}
        <LeftButtonIcon />左鍵拖曳旋轉
      {/if}
    {:else if $activePage.type === "splat"}
      {#if $isMobile}
        <SwipeIcon />單指滑動旋轉
        <FingerDragIcon />雙指拖曳平移/縮放
      {:else}
        <LeftButtonIcon />左鍵拖曳旋轉
        <RightButtonIcon />右鍵拖曳平移
        <MiddleButtonIcon />滾動滾輪縮放
      {/if}
    {/if}
  </div>
{/snippet}

{#snippet lower()}
  [<button
    class="text-blue-400 hover:text-blue-300 cursor-pointer flex items-center"
    onclick={() => ($mode = "Description")}
    tabindex="-1"
  >
    <CommentIcon />顯示內文
  </button>]
{/snippet}

<BorderBox
  class={[$mode === "Inspect" ? "opacity-100" : "opacity-0", "transition-all"]}
  {upper}
  upperClass="flex items-center"
  {content}
  {lower}
  lowerClass={$mode === "Inspect" && "pointer-events-auto"}
/>
