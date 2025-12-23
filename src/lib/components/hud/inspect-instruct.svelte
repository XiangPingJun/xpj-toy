<script lang="ts">
  import { isMobile, subjectUrl } from "$lib/stores/store";
  import LeftButtonIcon from "$lib/components/icons/left-button-icon.svelte";
  import MiddleButtonIcon from "$lib/components/icons/wheel-icon.svelte";
  import RightButtonIcon from "$lib/components/icons/right-button-icon.svelte";
  import SwipeIcon from "$lib/components/icons/swipe-icon.svelte";
  import FingerDragIcon from "$lib/components/icons/finger-drag-icon.svelte";
</script>

<div
  class={[
    "fixed top-0 left-0 w-full h-[100dvh] flex items-end justify-center pb-10 pointer-events-none px-2 text-slate-400 italic opacity-75",
  ]}
>
  <div>
    {#if $subjectUrl.endsWith(".sog")}
      {#if $isMobile}
        <span class="inline-flex items-center">
          <SwipeIcon class="w-[1.5rem] h-[1.5rem]" />單指滑動旋轉視角
        </span>
        <span class="inline-flex items-center">
          <FingerDragIcon class="w-[1.5rem] h-[1.5rem]" />雙指拖曳平移/縮放視角
        </span>
      {:else}
        <span class="inline-flex items-center">
          <LeftButtonIcon class="w-[1.5rem] h-[1.5rem]" />左鍵拖曳旋轉視角
        </span>
        <span class="inline-flex items-center">
          <RightButtonIcon class="w-[1.5rem] h-[1.5rem]" />右鍵拖曳平移視角
        </span>
        <span class="inline-flex items-center">
          <MiddleButtonIcon class="w-[1.5rem] h-[1.5rem]" />滾動滾輪縮放視角
        </span>
      {/if}
    {:else if $subjectUrl}
      {#if $isMobile}
        <span class="inline-flex items-center">
          <SwipeIcon class="w-[1.5rem] h-[1.5rem]" />手指滑動旋轉視角
        </span>
      {:else}
        <span class="inline-flex items-center">
          <LeftButtonIcon class="w-[1.5rem] h-[1.5rem]" />
          左鍵拖曳旋轉視角
        </span>
      {/if}
    {/if}
  </div>
</div>
