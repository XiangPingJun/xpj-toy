<script lang="ts">
  import { goto } from "$app/navigation";
  import Description from "./description.svelte";
  import {
    pages,
    activePage,
    activePageIndex,
    isPortrait,
  } from "$lib/stores/store";
  import BorderBox from "./border-box.svelte";
</script>

{#snippet overviewButton()}
  [<button
    class="text-blue-400 hover:text-blue-300 cursor-pointer mx-1 flex items-center gap-0.5"
    onclick={() => goto("/")}
  >
    <i class="las la-list"></i>
    總覽
  </button>]
{/snippet}

{#snippet upper()}
  [{$activePage?.title}]
{/snippet}

{#snippet content()}
  <Description
    class="bg-black/75 border-white box-content border-l-3 border-r-3 whitespace-pre-line h-[10rem]"
    height="10rem"
  />
{/snippet}

{#snippet lower()}
  {#if $activePageIndex === 0}
    {@render overviewButton()}
  {:else if $activePageIndex > 0}
    [<button
      class="text-blue-400 hover:text-blue-300 cursor-pointer mx-1 flex items-center"
      onclick={() => $activePageIndex--}
    >
      <i class="las la-arrow-left"></i>
      上頁
    </button>]
  {/if}
  {#if $activePageIndex < $pages.length - 1}
    [<button
      class="text-blue-400 hover:text-blue-300 cursor-pointer mx-1 flex items-center"
      onclick={() => $activePageIndex++}
    >
      下頁
      <i class="las la-arrow-right"></i>
    </button>]
  {:else if $pages.length > 1 && $activePageIndex === $pages.length - 1}
    {@render overviewButton()}
  {/if}
{/snippet}

<BorderBox {upper} {content} {lower} />
