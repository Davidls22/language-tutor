<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let disabled: boolean = false;

  const dispatch = createEventDispatcher();
</script>

<button
  type={type}
  disabled={disabled}
  on:click={(e) => dispatch('click', e)}
  class="px-4 py-2 mt-4 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
>
  <slot></slot>
</button>