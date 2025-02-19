<script>
  import TutorLayout from '$lib/components/layouts/TutorLayout.svelte';
  export let title;
  export let content;
</script>

<TutorLayout {title}>
  {content}
</TutorLayout>