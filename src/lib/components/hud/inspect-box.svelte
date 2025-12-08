<script lang="ts">
  import { mode, isMobile, activePage } from "$lib/stores/store";
  import BorderBox from "./border-box.svelte";
  import LeftButtonIcon from "$lib/components/icons/left-button-icon.svelte";
  import MiddleButtonIcon from "$lib/components/icons/middle-button-icon.svelte";
  import RightButtonIcon from "$lib/components/icons/right-button-icon.svelte";
  import VrGlassIcon from "$lib/components/icons/vr-glass-icon.svelte";
  import CommentIcon from "$lib/components/icons/comment-icon.svelte";
</script>

{#snippet upper()}
  [<VrGlassIcon />調整視角]
{/snippet}

{#snippet content()}
  <div
    class="bg-black/75 border-white box-content border-l-3 border-r-3 whitespace-pre-line px-4"
  >
    {#if $activePage.type === "pan"}
      <LeftButtonIcon />按住左鍵拖曳旋轉
    {:else if $activePage.type === "splat"}
      {#if $isMobile}{:else}
        <LeftButtonIcon />按住左鍵拖曳旋轉
        <MiddleButtonIcon />滾動滾輪縮放
        <RightButtonIcon />按住右鍵拖曳平移
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

<BorderBox {upper} {content} {lower} />
