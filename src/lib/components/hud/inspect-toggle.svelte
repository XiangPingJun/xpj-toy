<script lang="ts">
  import { fade } from "svelte/transition";
  import VrGlassIcon from "$lib/components/icons/vr-glass-icon.svelte";
  import CommentIcon from "$lib/components/icons/comment-icon.svelte";
  import { mode, scrolling } from "$lib/stores/store";
</script>

{#if $mode === "Story" && !$scrolling}
  <button
    transition:fade
    class="view-toggle top-6 left-6 p-3"
    onclick={() => ($mode = "Inspect")}
  >
    <VrGlassIcon class="w-5 h-5" />
  </button>
{:else if !$scrolling}
  <button
    transition:fade
    class="view-toggle top-6 left-6 p-3"
    onclick={() => ($mode = "Story")}
  >
    <CommentIcon class="w-5 h-5" />
  </button>
{/if}

<style>
  .view-toggle {
    position: fixed;
    background: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .view-toggle:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
  }
</style>
