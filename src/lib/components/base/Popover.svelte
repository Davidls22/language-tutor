<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let isOpen: boolean;

  const dispatch = createEventDispatcher();
  let popoverEl: HTMLDivElement | null = null;

  function handleOutsideClick(event: MouseEvent) {
    if (popoverEl && !popoverEl.contains(event.target as Node)) {
      dispatch('close');
    }
  }

  function handleKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      dispatch('close');
    }
  }
</script>

{#if isOpen}
  <button
    type="button"
    class="fixed inset-0 bg-transparent z-40"
    on:click={handleOutsideClick}
    on:keydown={handleKey}
    aria-label="Close popover"
    data-testid="popover-overlay"
  />

  <div
    bind:this={popoverEl}
    class="absolute bg-white border rounded-lg shadow-lg p-4 z-50"
    role="dialog"
    aria-modal="true"
  >
    <slot />
  </div>
{/if}