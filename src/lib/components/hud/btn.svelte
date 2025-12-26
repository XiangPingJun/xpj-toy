<script lang="ts">
  const props = $props();
  import { fade } from "svelte/transition";
</script>

<button
  transition:fade
  class={[
    "text-blue-300 flex items-center cursor-pointer hover:text-blue-200 text-sm edge-feather backdrop-blur py-0.5 px-1.5 backdrop-brightness-80 opacity-90",
    props.class,
  ]}
  onclick={props.onclick}
>
  {@render props.children()}
</button>
