<script lang="ts">
  import PromptButton from '$lib/components/base/PromptButton.svelte';
  import Popover from '$lib/components/base/Popover.svelte';

  export let onPromptSelected: (prompt: string) => void;
  export let isOpen: boolean;
  export let onClose: () => void;

  export let prompts: string[];
</script>

<Popover {isOpen} {onClose}>
  <div class="space-y-2">
    {#each prompts as prompt}
      <PromptButton text={prompt} onClick={() => onPromptSelected(prompt)} />
    {/each}
  </div>
</Popover>