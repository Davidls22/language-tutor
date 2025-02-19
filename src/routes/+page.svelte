<script lang="ts">
  import TutorLayout from '$lib/components/layouts/TutorLayout.svelte';
  import ChatWindow, { type Message } from '$lib/components/composite/ChatWindow.svelte';
  import ChatInput from '$lib/components/composite/ChatInput.svelte';
  import { setChatContext, getChatContext } from '$lib/contexts/ChatContext';
  import { sendMessageToTutor } from '$lib/services/tutorService';
  import { get } from 'svelte/store';
  import { onDestroy } from 'svelte';

  setChatContext();
  const chatStore = getChatContext();

  let messages: Message[] = [];
  const unsubscribe = chatStore.subscribe(value => {
    messages = value;
  });

  let chatInputRef: ChatInput | null = null;

  async function handleUserSubmit(event: CustomEvent<{ message: string }>) {
    const userMessage = { sender: 'user', text: event.detail.message };
    chatStore.addMessage(userMessage);

    await fetchTutorResponse();
  }

  async function fetchTutorResponse() {
    const currentMessages = get(chatStore);
    try {
      const response = await sendMessageToTutor(currentMessages);
      const tutorMessage = { sender: 'tutor', text: response.tutorMessage };
      chatStore.addMessage(tutorMessage);

      if (chatInputRef) {
        chatInputRef.updatePromptsBasedOnTutorResponse(response.tutorMessage);
      }
    } catch (error) {
      chatStore.addMessage({ sender: 'tutor', text: 'Sorry, an error occurred.' });
    }
  }

  async function startTutorConversation() {
    chatStore.addMessage({
      sender: 'tutor',
      text: "Bonjour! Je suis votre tuteur de français. Comment puis-je vous aider aujourd'hui ?"
    });
  }

  startTutorConversation();

  onDestroy(() => {
    unsubscribe();
  });
</script>

<TutorLayout>
  <ChatWindow {messages} />
  <ChatInput bind:this={chatInputRef} on:submit={handleUserSubmit} />
</TutorLayout>