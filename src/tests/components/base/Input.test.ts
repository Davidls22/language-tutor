import { render, fireEvent } from '@testing-library/svelte';
import Input from '$lib/components/base/Input.svelte';
import { expect, test } from 'vitest';

test('renders input with placeholder', () => {
  const { getByPlaceholderText } = render(Input, {
    target: document.body,
    props: { placeholder: 'Enter text...' }
  });
  const input = getByPlaceholderText('Enter text...');
  expect(input).toBeTruthy();
});

test('input updates value on input event', async () => {
  const { getByPlaceholderText } = render(Input, {
    target: document.body,
    props: { placeholder: 'Enter text...', value: '' }
  });
  const input = getByPlaceholderText('Enter text...');
  await fireEvent.input(input, { target: { value: 'hello' } });
  expect((input as HTMLInputElement).value).toBe('hello');
});