import { writable } from 'svelte/store';

export interface Message {
    id: number;
    sender: 'user' | 'tutor';
    text: string;
    originalText: string;
    translatedText?: string;
    isTranslating?: boolean;
    isChecking?: boolean;
    feedbackText?: string;
    currentLang: 'fr' | 'en';
  }

export function createChatStore() {
  const { subscribe, update, set } = writable<Message[]>([]);

  function addMessage(message: Omit<Message, 'id' | 'currentLang'>) {
    update((messages) => [
      ...messages,
      {
        id: Date.now(),
        currentLang: 'fr',
        ...message,
        originalText: message.text 
      }
    ]);
  }

  async function translateMessage(messageId: number) {
    update((messages) =>
      messages.map((m) => {
        if (m.id !== messageId) return m;

        m.isTranslating = true;
        return m;
      })
    );

    let targetLang: 'fr' | 'en' = 'fr';

    let translatedText = '';
    try {
      const messageToTranslate = getMessageById(messageId);
      if (!messageToTranslate) return;

      targetLang = messageToTranslate.currentLang === 'fr' ? 'en' : 'fr';
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: messageToTranslate.text, targetLang })
      });

      const data = await res.json();
      translatedText = data.translation;
    } catch (error) {
      console.error('Translation failed:', error);
      translatedText = 'Failed to translate';
    }

    update((messages) =>
      messages.map((m) => {
        if (m.id !== messageId) return m;

        m.isTranslating = false;

        if (targetLang === 'en') {
          m.translatedText = translatedText;
          m.text = translatedText; // Swap instantly
        } else {
          m.text = m.originalText; // Restore French
          m.translatedText = undefined;
        }

        m.currentLang = targetLang;
        return m;
      })
    );
  }

  function getMessageById(messageId: number) {
    let foundMessage: Message | undefined;
    update((messages) => {
      foundMessage = messages.find((m) => m.id === messageId);
      return messages;
    });
    return foundMessage;
  }

  async function checkMessage(messageId: number) {
    update((messages) =>
      messages.map((m) =>
        m.id === messageId ? { ...m, isChecking: true } : m
      )
    );
  
    try {
      const messageToCheck = getMessageById(messageId);
      if (!messageToCheck) throw new Error('Message not found');
  
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: messageToCheck.text })
      });
  
      const data = await res.json();
  
      update((messages) =>
        messages.map((m) =>
          m.id === messageId
            ? { ...m, isChecking: false, feedbackText: data.feedback }
            : m
        )
      );
    } catch (error) {
      console.error('Message check failed:', error);
      update((messages) =>
        messages.map((m) =>
          m.id === messageId
            ? { ...m, isChecking: false, feedbackText: 'Failed to check message' }
            : m
        )
      );
    }
  }

  function reset() {
    set([]);
  }

  return {
    subscribe,
    addMessage,
    translateMessage,
    checkMessage,
    reset
  };
}