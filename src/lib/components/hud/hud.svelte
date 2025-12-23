<script lang="ts">
  import Story from "./story.svelte";
  import InspectInstruct from "./inspect-instruct.svelte";
  import InspectToggle from "./inspect-toggle.svelte";
  import Media from "$lib/components/hud/media.svelte";
  import { mode } from "$lib/stores/store";
</script>

<Story />
{#if $mode === "Inspect"}
  <InspectInstruct />
{/if}
<InspectToggle />
{#if $mode !== "Inspect"}
  <Media />
{/if}
