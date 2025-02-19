import { render } from '@testing-library/svelte';
import ChatWindow from '$lib/components/composite/ChatWindow.svelte';
import { expect, test } from 'vitest';

test('renders chat messages', () => {
  const messages = [
    { id: 1, sender: 'user', text: 'Hello' },
    { id: 2, sender: 'tutor', text: 'Bonjour' }
  ];
  const { getByText } = render(ChatWindow, {
    target: document.body,
    props: { messages }
  });
  expect(getByText('Hello')).toBeTruthy();
  expect(getByText('Bonjour')).toBeTruthy();
});