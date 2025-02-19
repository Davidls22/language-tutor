import { render } from '@testing-library/svelte';
import Tooltip from '$lib/components/base/Tooltip.svelte';
import { expect, test } from 'vitest';

test('renders tooltip with content', () => {
  const { getByText } = render(Tooltip, { content: 'Example Tooltip' });
  expect(getByText('Example Tooltip')).toBeTruthy();
});