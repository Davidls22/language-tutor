import { render } from '@testing-library/svelte';
import { expect, test } from 'vitest';
import TutorLayoutTestWrapper from './TutorLayoutTestWrapper.svelte';

test('renders layout with title and content', () => {
  const { getByText } = render(TutorLayoutTestWrapper, {
    props: {
      title: 'Test Tutor',
      content: 'Content',
    },
  });

  expect(getByText('Test Tutor')).toBeTruthy();
  expect(getByText('Content')).toBeTruthy();
});