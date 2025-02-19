<script>
  import Button from '$lib/components/base/Button.svelte';
  export let type;
  export let content;
  export let handleClick;
</script>

<Button {type} on:click={handleClick}>
  {content}
</Button>