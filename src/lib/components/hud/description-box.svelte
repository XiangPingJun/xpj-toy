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
  import VrGlassIcon from "../icons/vr-glass-icon.svelte";
  import ListIcon from "../icons/list-icon.svelte";
</script>

{#snippet overviewButton()}
  [<button
    class="text-blue-400 hover:text-blue-300 cursor-pointer flex items-center"
    onclick={() => ($mode = "Inspect")}
  >
    <VrGlassIcon />調整視角
  </button>
  ] [<button
    class="text-blue-400 hover:text-blue-300 cursor-pointer flex items-center"
    onclick={() => goto("/")}
  >
    <ListIcon />總覽
  </button>]
{/snippet}

{#snippet upper()}
  {#if !$descriptionInitialized}
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
  {#if !$descriptionInitialized}
    [...] [...]
  {:else}
    {#if $activePageIndex === 0}
      {@render overviewButton()}
    {:else if $activePageIndex > 0}
      [<button
        class="text-blue-400 hover:text-blue-300 cursor-pointer flex items-center"
        onclick={() => $activePageIndex--}
      >
        <i class="las la-arrow-left"></i>
        上頁
      </button>]
    {/if}
    {#if $activePageIndex < $pages.length - 1}[<button
        class="text-blue-400 hover:text-blue-300 cursor-pointer flex items-center"
        onclick={() => $activePageIndex++}
      >
        下頁
        <i class="las la-arrow-right"></i>
      </button>]
    {:else if $pages.length > 1 && $activePageIndex === $pages.length - 1}
      {@render overviewButton()}
    {/if}
  {/if}
{/snippet}

<BorderBox {upper} {content} {lower} />
