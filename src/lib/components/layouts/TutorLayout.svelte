<script lang="ts">
  export let title: string = 'Virtual Language Tutor';
  export let subtitle: string = 'Practice your French by chatting with your AI tutor. Try writing your messages in French, and the tutor will respond to help you improve.';
</script>

<div class="max-w-6xl mx-auto px-8 py-10 bg-white border border-gray-100 rounded-3xl shadow-xl flex flex-col h-[80vh] max-h-[1050px]">
  <header class="text-center mb-4 shrink-0">
    <h1 class="text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">{title}</h1>
    <p class="text-lg text-gray-600 mt-2 mb-4">{subtitle}</p>
  </header>

  <main class="flex-1 overflow-hidden flex flex-col space-y-4">
    <slot />
  </main>
</div>