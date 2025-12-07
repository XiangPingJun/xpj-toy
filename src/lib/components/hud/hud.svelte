<script lang="ts">
  import DescriptionBox from "./description-box.svelte";
  import InspectBox from "./inspect-box.svelte";
  import { mode } from "$lib/stores/store";
</script>

<div
  class={[
    $mode === "Description"
      ? "opacity-100 pointer-events-auto"
      : "opacity-0 pointer-events-none",
    "transition-all",
  ]}
>
  <DescriptionBox />
</div>
<div
  class={[
    $mode === "Inspect"
      ? "opacity-100 pointer-events-auto"
      : "opacity-0 pointer-events-none",
    "transition-all",
  ]}
>
  <InspectBox />
</div>
