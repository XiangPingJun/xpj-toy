<script lang="ts">
  import { pages, activePageIndex, activePage } from "$lib/stores/store";
  import { goto } from "$app/navigation";
  import { fly } from "svelte/transition";
  import {
    splatPov,
    panPov,
    imgUrl,
    videoUrl,
    resources,
  } from "$lib/stores/store";
  import ListIcon from "$lib/components/icons/list-icon.svelte";
  import RightArrowIcon from "$lib/components/icons/right-arrow-icon.svelte";
  import PaperPlane from "$lib/components/icons/paper-plane-icon.svelte";

  let props = $props();
  let loading = $state(false);

  $effect(() => {
    if (!props.isActive) {
      return;
    }
    if (props.pov) {
      switch ($activePage.type) {
        case "splat":
          $splatPov = props.pov;
          break;
        case "pan":
          $panPov = props.pov;
          break;
      }
    }

    $imgUrl = props.imgUrl ?? "";
    $videoUrl = props.videoUrl ?? "";
  });

  $effect(() => {
    loading =
      (props.imgUrl && !$resources[props.imgUrl]) ||
      (props.videoUrl && !$resources[props.videoUrl]);
  });
</script>

<div
  class={[
    "font-[uoqmunthenkhung] snap-start mb-2 transition-all duration-500",
    !props.isActive && "text-gray-400",
  ]}
  style:min-height={props.isLast ? props.height : undefined}
  style="scroll-snap-stop: always;"
>
  {#if props.isActive}
    {#if loading}
      <img src="/loading.svg" alt="" class="w-[1rem] h-[1rem] inline mr-1" />
    {:else}
      <PaperPlane />
    {/if}
  {/if}{props.text}
  {#if props.isLast}
    <div></div>
    {#if props.isActive}
      {#if $activePageIndex < $pages.length - 1}
        <button
          class="text-blue-400 hover:text-blue-300 cursor-pointer font-[uoqmunthenkhung] mt-3 relative pb-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-current"
          transition:fly={{ y: 24 }}
          onclick={() => $activePageIndex++}
          tabindex="-1"
        >
          <RightArrowIcon />下頁繼續...
        </button>
      {:else if $pages.length === 1 || $activePageIndex === $pages.length - 1}
        <button
          class="text-blue-400 hover:text-blue-300 cursor-pointer font-[uoqmunthenkhung] mt-3 relative pb-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-current"
          transition:fly={{ y: 24 }}
          onclick={() => goto("/")}
          tabindex="-1"
        >
          <ListIcon />回到總覽
        </button>
      {/if}
    {:else}
      ...
    {/if}
  {/if}
</div>
