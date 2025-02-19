import { render, fireEvent } from '@testing-library/svelte';
import { expect, test, vi } from 'vitest';
import ButtonTestWrapper from './ButtonTestWrapper.svelte';

test('renders button with text', () => {
  const { getByText } = render(ButtonTestWrapper, {
    props: {
      type: 'button',
      content: 'Click me',
    },
  });

  expect(getByText('Click me')).toBeTruthy();
});

test('button click event', async () => {
  const handleClick = vi.fn();

  const { getByText } = render(ButtonTestWrapper, {
    props: {
      type: 'button',
      content: 'Click me',
      handleClick,
    },
  });

  const button = getByText('Click me');
  await fireEvent.click(button);

  expect(handleClick).toHaveBeenCalled();
});