import { setContext, getContext } from 'svelte';
import type { Writable } from 'svelte/store';
import type { Message } from '$lib/hooks/useChat';
import { createChatStore } from '$lib/hooks/useChat';

const CHAT_CONTEXT = Symbol('CHAT_CONTEXT');

export function setChatContext() {
  const chatStore = createChatStore();
  setContext(CHAT_CONTEXT, chatStore);
}

export function getChatContext() {
  return getContext<ReturnType<typeof createChatStore>>(CHAT_CONTEXT);
}