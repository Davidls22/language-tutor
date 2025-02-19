<script lang="ts">
  import Button from '$lib/components/base/Button.svelte';
  import WordExplain from '$lib/components/composite/WordExplain.svelte';
  import type { Message } from '$lib/hooks/useChat';
  import { getChatContext } from '$lib/contexts/ChatContext';

  export let messages: Message[] = [];

  const chatStore = getChatContext();

  function handleTranslate(messageId: number) {
    chatStore.translateMessage(messageId);
  }

  function handleCheckMessage(messageId: number) {
    chatStore.checkMessage(messageId);
  }

  function splitIntoWords(text: string) {
    return text.split(/(\s+)/).filter(Boolean);
  }
</script>

<div class="max-h-[60vh] overflow-y-auto p-4 border border-gray-300 rounded-lg bg-gray-50  p-4 space-y-4 relative">
  <div class="bg-yellow-50 text-yellow-800 p-2 rounded mb-4 text-sm border border-yellow-300">
    💡 <strong>Hints:</strong> Click <span class="text-blue-600 underline">any word</span> for its explanation. Use <span class="text-blue-500 font-semibold">Translate</span> to translate the entire message, and <span class="text-blue-500 font-semibold">Check My Message</span> for feedback on your response.
  </div>

  {#each messages as message (message.id)}
    {#if message.sender === 'tutor'}
      <div class="p-3 rounded-lg bg-orange-100 border border-orange-300 shadow-sm relative">
        <p class="text-gray-800 flex flex-wrap gap-1">
          {#each splitIntoWords(message.currentLang === 'fr' ? message.originalText ?? message.text : message.translatedText ?? message.text) as part, i (i)}
            {#if part.trim()}
              {#if typeof window !== 'undefined'}
                <span class="inline-block">
                  <WordExplain word={part} />
                </span>
              {:else}
                <span>{part}</span>
              {/if}
            {:else}
              <span>{part}</span> <!-- Spaces -->
            {/if}
          {/each}
        </p>

        {#if message.isTranslating}
          <p class="text-sm text-orange-600 mt-1 animate-pulse">Translating...</p>
        {/if}

        <Button on:click={() => handleTranslate(message.id)} disabled={message.isTranslating} class="mt-3">
          {#if message.currentLang === 'fr'}
            Translate to English
          {:else}
            Translate to French
          {/if}
        </Button>
      </div>
    {:else}
      <div class="p-3 rounded-lg bg-blue-50 border border-blue-300 shadow-sm">
        <p class="text-gray-800">{message.text}</p>

        {#if message.feedbackText}
          <p class="text-green-600 mt-2 italic">{message.feedbackText}</p>
        {/if}

        {#if message.isChecking}
          <p class="text-sm text-green-600 animate-pulse">Checking your message...</p>
        {/if}

        <Button on:click={() => handleCheckMessage(message.id)} disabled={message.isChecking} class="mt-2">
          Check My Message
        </Button>
      </div>
    {/if}
  {/each}
</div>