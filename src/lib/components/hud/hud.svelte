<script lang="ts">
  import Story from "./story.svelte";
  import InspectInstruct from "./inspect-instruct.svelte";
  import Rotate3dIcon from "$lib/components/icons/rotate-3d-icon.svelte";
  import CommentIcon from "$lib/components/icons/comment-icon.svelte";
  import ListIcon from "$lib/components/icons/list-icon.svelte";
  import NavigationDot from "./navigation-dot.svelte";
  import Btn from "./btn.svelte";
  import { mode, activeLineTrigger } from "$lib/stores/store";
</script>

<div class={[$mode !== "Story" && "opacity-0 pointer-events-none"]}>
  <Story />
  <NavigationDot />
  <Btn class="fixed top-2 left-2" onclick={() => ($mode = "Inspect")}>
    <Rotate3dIcon class="w-[1rem] h-[1rem] mr-0.5" />旋轉視角
  </Btn>
</div>
<div class={[$mode !== "Inspect" && "opacity-0 pointer-events-none"]}>
  <Btn
    class="fixed top-2 left-2"
    onclick={() => {
      $mode = "Story";
      $activeLineTrigger = $activeLineTrigger + 1;
    }}
  >
    <CommentIcon class="w-[1rem] h-[1rem] mr-0.5" />回到內文
  </Btn>
  <InspectInstruct />
</div>
<Btn class="fixed top-2 right-2" onclick={() => window.location.assign("/")}>
  <ListIcon class="w-[1rem] h-[1rem] mr-0.5" />返回目錄
</Btn>
