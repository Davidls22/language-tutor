<script lang="ts">
  export let value: string = '';
  export let placeholder: string = '';

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    value = target.value;
  }
</script>

<input
  type="text"
  {placeholder}
  {value}
  on:input={handleInput}
  class="w-full m-2 mt-2 px-4 py-2 border border-gray-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
/>