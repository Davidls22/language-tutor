import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const OPENAI_API_KEY = env.OPENAI_API_KEY;

export const POST: RequestHandler = async ({ request }) => {
  const { text, targetLang } = await request.json();

  const prompt =
    targetLang === 'en'
      ? 'Translate this French text to English:'
      : 'Translate this English text to French:';

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: prompt,
        },
        {
          role: 'user',
          content: text,
        },
      ],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('Translation API error:', data);
    return json({ error: 'Translation API error', details: data }, { status: 500 });
  }

  return json({ translation: data.choices[0].message.content });
};