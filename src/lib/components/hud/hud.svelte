<script lang="ts">
  import Story from "./story.svelte";
  import InspectInstruct from "./inspect-instruct.svelte";
  import InspectToggle from "./inspect-toggle.svelte";
  import NavigationDot from "./navigation-dot.svelte";
  import { mode } from "$lib/stores/store";
</script>

<Story />
<NavigationDot />
{#if $mode === "Inspect"}
  <InspectInstruct />
{/if}
<InspectToggle />
