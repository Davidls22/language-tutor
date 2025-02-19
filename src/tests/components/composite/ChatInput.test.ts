import { render, fireEvent } from '@testing-library/svelte';
import ChatInput from '$lib/components/composite/ChatInput.svelte';
import { expect, test, vi } from 'vitest';

test('chat input dispatches submit event with message', async () => {
  const handleSubmit = vi.fn();

  const { getByPlaceholderText, getByText } = render(ChatInput, {
    events: { submit: handleSubmit },
  });

  const input = getByPlaceholderText('Type your message...') as HTMLInputElement;
  await fireEvent.input(input, { target: { value: 'Bonjour' } });

  const button = getByText('Send');
  await fireEvent.click(button);

  expect(handleSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      detail: { message: 'Bonjour' },
    })
  );
});