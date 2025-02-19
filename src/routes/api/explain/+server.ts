import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const OPENAI_API_KEY = env.OPENAI_API_KEY;

export const POST: RequestHandler = async ({ request }) => {
  const { word } = await request.json();

  const prompt = `Explain the French word "${word}". Provide a definition, example sentence, and synonyms.`;
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
      }),
    });

    const data = await response.json();
    const explanation = data.choices[0].message.content;
    return json({ explanation });
  } catch (error) {
    return json({ error: 'Failed to fetch explanation' }, { status: 500 });
  }
};