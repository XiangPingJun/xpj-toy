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
    class="text-blue-400 fixed flex items-center cursor-pointer hover:text-blue-300 bottom-4.5 left-4 text-sm"
    onclick={() => ($mode = "Inspect")}
  >
    <EyeIcon class="w-[1.125rem] h-[1.125rem] mt-0.5 mr-0.5" />檢視
  </button>
</div>
<div class={[$mode !== "Inspect" && "opacity-0 pointer-events-none"]}>
  <InspectInstruct />
</div>
