<script lang="ts">
  export let text: string;
  export let onClick: (() => void) | null = null;
</script>

<button
  on:click={onClick}
   class="px-2 py-0.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition border border-gray-200 shadow-sm"
>
  {text}
</button>