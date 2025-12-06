<script lang="ts">
  import DescriptionBox from "./description-box.svelte";

  let mode: "Description" | "Inspect" = "Description";
</script>

{#if mode === "Description"}
  <DescriptionBox />
{:else if mode === "Inspect"}
  <div class="inspect-box">
    <!-- Inspect mode content goes here -->
    <p>Inspect mode is under construction.</p>
  </div>
{/if}
