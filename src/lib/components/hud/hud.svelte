<script lang="ts">
  import Story from "./story.svelte";
  import InspectInstruct from "./inspect-instruct.svelte";
  import InspectToggle from "./inspect-toggle.svelte";
  import { mode } from "$lib/stores/store";
</script>

<Story />
{#if $mode === "Inspect"}
  <InspectInstruct />
{/if}
<InspectToggle />
