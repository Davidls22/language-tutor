<script lang="ts">
  import PromptButton from '$lib/components/base/PromptButton.svelte';

  export let text: string;
  export let handleClick: () => void;
</script>

<PromptButton {text} on:click={handleClick} />