<script lang="ts">
  import { goto } from "$app/navigation";
  import Description from "./description.svelte";
  import {
    pages,
    activePage,
    activePageIndex,
    descriptionInitialized,
    mode,
  } from "$lib/stores/store";
  import BorderBox from "./border-box.svelte";
  import VrGlassIcon from "$lib/components/icons/vr-glass-icon.svelte";
  import ListIcon from "$lib/components/icons/list-icon.svelte";
  import RightIcon from "$lib/components/icons/right-icon.svelte";
  import LeftIcon from "$lib/components/icons/left-icon.svelte";
</script>

{#snippet changeViewButton()}
  [<button
    class="text-blue-400 hover:text-blue-300 cursor-pointer flex items-center"
    onclick={() => ($mode = "Inspect")}
    tabindex="-1"
  >
    <VrGlassIcon />調整視角
  </button>
  ]
{/snippet}

{#snippet overviewButton()}
  [<button
    class="text-blue-400 hover:text-blue-300 cursor-pointer flex items-center"
    onclick={() => goto("/")}
    tabindex="-1"
  >
    <ListIcon />總覽
  </button>]
{/snippet}

{#snippet upper()}
  {#if false && !$descriptionInitialized}
    [...]
  {:else}
    [<i class="las la-comment"></i>{$activePage?.title}]
  {/if}
{/snippet}

{#snippet content()}
  <Description
    class="bg-black/75 border-white box-content border-l-3 border-r-3 whitespace-pre-line"
    height="10rem"
  />
{/snippet}

{#snippet lower()}
  {#if false && !$descriptionInitialized}
    [...] [...]
  {:else}
    {@render changeViewButton()}
    {#if $activePageIndex === 0}
      {@render overviewButton()}
    {:else if $activePageIndex > 0}
      [<button
        class="text-blue-400 hover:text-blue-300 cursor-pointer flex items-center"
        onclick={() => $activePageIndex--}
        tabindex="-1"
      >
        <LeftIcon />上頁
      </button>]
    {/if}
    {#if $activePageIndex < $pages.length - 1}[<button
        class="text-blue-400 hover:text-blue-300 cursor-pointer flex items-center"
        onclick={() => $activePageIndex++}
        tabindex="-1"
      >
        下頁<RightIcon />
      </button>]
    {:else if $pages.length > 1 && $activePageIndex === $pages.length - 1}
      {@render overviewButton()}
    {/if}
  {/if}
{/snippet}

<BorderBox {upper} {content} {lower} />
