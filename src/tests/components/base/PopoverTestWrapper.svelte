<script lang="ts">
  import Popover from '$lib/components/base/Popover.svelte';

  export let isOpen: boolean;
  export let handleClose: () => void;
</script>

<Popover {isOpen} on:close={handleClose}>
  <p>Popover content</p>
</Popover>