import { render, fireEvent, waitFor } from '@testing-library/svelte';
import { expect, test, vi } from 'vitest';
import WordExplain from '$lib/components/composite/WordExplain.svelte';

test('renders the word and triggers explanation on click', async () => {
  const mockFetch = vi.fn(() =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          json: () => Promise.resolve({ explanation: 'Definition of Bonjour' }),
        });
      }, 50);
    })
  );

  vi.stubGlobal('fetch', mockFetch);

  const { getByText, findByText } = render(WordExplain, { word: 'Bonjour' });

  const button = getByText('Bonjour');
  await fireEvent.click(button);

  await findByText('Loading explanation...');

  await waitFor(() => {
    expect(getByText('Definition of Bonjour')).toBeTruthy();
  });

  vi.restoreAllMocks();
});