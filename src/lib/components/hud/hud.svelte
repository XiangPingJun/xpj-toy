<script lang="ts">
  import Story from "./story.svelte";
  import InspectInstruct from "./inspect-instruct.svelte";
  import EyeIcon from "$lib/components/icons/eye-icon.svelte";
  import NavigationDot from "./navigation-dot.svelte";
  import { mode } from "$lib/stores/store";
</script>

<div class={[$mode !== "Story" && "opacity-0 pointer-events-none"]}>
  <Story />
  <NavigationDot />
  <button
    class="text-blue-400 fixed flex items-center cursor-pointer hover:text-blue-300 bottom-4 left-1/2 transform -translate-x-1/2 pl-48"
    onclick={() => ($mode = "Inspect")}
  >
    <EyeIcon class="w-[1.5rem] h-[1.5rem] mr-0.5" />
  </button>
</div>
<div class={[$mode !== "Inspect" && "opacity-0 pointer-events-none"]}>
  <InspectInstruct />
</div>
