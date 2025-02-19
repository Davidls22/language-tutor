import { render, fireEvent } from '@testing-library/svelte';
import { expect, test, vi } from 'vitest';
import PromptButton from '$lib/components/base/PromptButton.svelte';

test('calls click handler when clicked', async () => {
  const handleClick = vi.fn();

  const { getByText } = render(PromptButton, {
    props: {
      text: 'Click me',
    },
  });

  const button = getByText('Click me');

  button.addEventListener('click', handleClick);

  await fireEvent.click(button);

  expect(handleClick).toHaveBeenCalled();
});