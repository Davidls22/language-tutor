import { sendMessageToTutor } from '$lib/services/tutorService';
import { expect, test, vi } from 'vitest';

test('sendMessageToTutor returns a tutor message', async () => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ tutorMessage: 'Test tutor message' })
    })
  ) as unknown as typeof fetch;

  const messages = [{ id: 1, sender: 'user', text: 'Hello' }];
  const response = await sendMessageToTutor(messages);
  expect(response.tutorMessage).toBe('Test tutor message');
});