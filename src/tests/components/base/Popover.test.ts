import { render, fireEvent } from '@testing-library/svelte';
import { expect, test, vi } from 'vitest';
import PopoverTestWrapper from './PopoverTestWrapper.svelte';

test('renders popover and closes on outside click', async () => {
  const mockClose = vi.fn();

  const { getByRole } = render(PopoverTestWrapper, {
    props: {
      isOpen: true,
      handleClose: mockClose,
    },
  });

  const overlay = getByRole('button', { name: /close popover/i });
  await fireEvent.click(overlay);

  expect(mockClose).toHaveBeenCalled();
});