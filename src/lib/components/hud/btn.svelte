<script lang="ts">
  const props = $props();
  import { fade } from "svelte/transition";
</script>

<button
  transition:fade
  class={[
    "text-blue-300 inline-flex items-center cursor-pointer hover:text-blue-200 text-sm edge-feather py-0.5 px-1.5 backdrop-blur backdrop-brightness-50 backdrop-opacity-80",
    props.class,
  ]}
  onclick={props.onclick}
>
  {@render props.children()}
</button>
