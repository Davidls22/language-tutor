<script lang="ts">
  export let word: string;

  let isLoading = false;
  let explanation: string | null = null;
  let error: string | null = null;
  let isOpen = false;

  async function fetchExplanation() {
    isOpen = true;
    isLoading = true;
    error = null;

    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word })
      });

      const data = await res.json();
      if (data.explanation) {
        explanation = data.explanation;
      } else {
        error = data.error || 'Failed to fetch explanation';
      }
    } catch (err) {
      error = 'Failed to connect';
    } finally {
      isLoading = false;
    }
  }

  function closePopover() {
    isOpen = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closePopover();
    }
  }
</script>

<span class="relative group">
  <button
    on:click={fetchExplanation}
    class="text-blue-600 underline cursor-pointer hover:bg-blue-50 px-1 rounded"
  >
    {word}
  </button>

  {#if isOpen}
    <!-- Popover Modal -->
    <div class="absolute left-0 z-50 mt-2 bg-white p-4 border rounded-lg shadow-lg w-80 text-sm text-gray-800">
      <!-- Close Button (X) in top-right -->
      <button
        on:click={closePopover}
        class="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        ✕
      </button>

      <!-- Content -->
      {#if isLoading}
        <p class="animate-pulse text-gray-500">Loading explanation...</p>
      {:else if error}
        <p class="text-red-500">{error}</p>
      {:else if explanation}
        <p class="whitespace-pre-line">{explanation}</p>
      {/if}
    </div>

    <!-- Overlay to close when clicking outside -->
    <div
      class="fixed inset-0 z-40"
      on:click={closePopover}
      on:keydown={handleKeydown}
      tabindex="-1"
    ></div>
  {/if}
</span>