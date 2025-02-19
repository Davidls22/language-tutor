import { render, fireEvent } from '@testing-library/svelte';
import { expect, test, vi } from 'vitest';
import StarterPromptList from '$lib/components/composite/StarterPromptList.svelte';

test('renders and selects prompt', async () => {
  const mockSelect = vi.fn();

  const { getByText } = render(StarterPromptList, {
    props: {
      isOpen: true,
      onPromptSelected: mockSelect,
      onClose: () => {},
      prompts: [
        'Bonjour, comment ça va ?',
        'Je m’appelle [name].',
        'Je voudrais apprendre le français.',
      ],
    },
  });

  const promptButton = getByText('Bonjour, comment ça va ?');
  await fireEvent.click(promptButton);

  expect(mockSelect).toHaveBeenCalledWith('Bonjour, comment ça va ?');
});