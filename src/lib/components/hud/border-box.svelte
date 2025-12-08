<script lang="ts">
  const props = $props();
  import { isPortrait } from "$lib/stores/store";
</script>

<div
  class={[
    "fixed left-1/2 -translate-x-1/2 max-w-[40rem] w-[calc(100vw-1rem)] pointer-events-none",
    $isPortrait ? "bottom-3" : "bottom-12",
    props.class,
  ]}
>
  <div class="flex">
    <div
      class="rounded-tl-md border-t-3 border-l-3 border-white box-content h-[1em] bg-black/75 w-[2rem]"
    ></div>
    <div class={["bg-black/75 -mt-2.5 px-0.5", props.upperClass]}>
      {@render props.upper()}
    </div>
    <div
      class="rounded-tr-md border-t-3 border-r-3 border-white box-content h-[1em] bg-black/75 flex-grow"
    ></div>
  </div>
  <div class={props.contentClass}>
    {@render props.content()}
  </div>
  <div class="flex">
    <div
      class="rounded-bl-md border-b-3 border-l-3 border-white box-content h-[1em] bg-black/75 flex-grow"
    ></div>
    <div
      class={["bg-black/75 pt-1.25 px-0.5 flex items-center", props.lowerClass]}
    >
      {@render props.lower()}
    </div>
    <div
      class="rounded-br-md border-b-3 border-r-3 border-white box-content h-[1em] bg-black/75 w-[2rem]"
    ></div>
  </div>
</div>
