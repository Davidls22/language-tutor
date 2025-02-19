<script lang="ts">
  import Input from '$lib/components/base/Input.svelte';
  import Button from '$lib/components/base/Button.svelte';
  import StarterPromptList from '$lib/components/composite/StarterPromptList.svelte';
  import { createEventDispatcher, onMount } from 'svelte';

  let message: string = '';
  let isPromptOpen = false;

  let currentPrompts: string[] = [
    'Bonjour, comment ça va ?',
    'Je m’appelle [name].',
    'Je voudrais apprendre le français.',
  ];

  const dispatch = createEventDispatcher<{ submit: { message: string } }>();

  function handleSubmit() {
    const messageToSend = message.trim();
    if (messageToSend) {
      dispatch('submit', { message: messageToSend });
      message = '';
    }
  }

  function handlePromptSelect(prompt: string) {
    message = prompt;
    isPromptOpen = false;
  }

  export function updatePromptsBasedOnTutorResponse(tutorResponse: string) {
    if (tutorResponse.includes('voyage')) {
      currentPrompts = [
        'Où est-ce que vous aimez voyager ?',
        'Quel est votre pays préféré ?',
        'Avez-vous déjà visité la France ?',
      ];
    } else if (tutorResponse.includes('travail')) {
      currentPrompts = [
        'Quel est votre métier ?',
        'Où travaillez-vous ?',
        'Depuis combien de temps travaillez-vous ici ?',
      ];
    } else {
      currentPrompts = [
        'Pouvez-vous expliquer cela encore une fois ?',
        'Comment dit-on cela en français ?',
        'Pouvez-vous me donner un exemple ?',
      ];
    }
  }
</script>

<div class="flex gap-2 items-start relative">
  <Input
    placeholder="Type your message..."
    bind:value={message}
    on:keydown={(e: KeyboardEvent) => e.key === 'Enter' && handleSubmit()}
  />
  <Button on:click={handleSubmit}>Send</Button>
  <Button on:click={() => (isPromptOpen = !isPromptOpen)}>Prompts</Button>

  <StarterPromptList
    isOpen={isPromptOpen}
    onPromptSelected={handlePromptSelect}
    onClose={() => (isPromptOpen = false)}
    prompts={currentPrompts}
  />
</div>