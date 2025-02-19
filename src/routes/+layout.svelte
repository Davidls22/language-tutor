<script>
  let { children } = $props();
  import "../app.css";
</script>

<div class="min-h-screen bg-teal-800 text-white flex justify-center items-start pt-6">
  {@render children()}
</div>