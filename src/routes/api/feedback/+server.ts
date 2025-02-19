import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const OPENAI_API_KEY = env.OPENAI_API_KEY;

export const POST: RequestHandler = async ({ request }) => {
  const { text } = await request.json();

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a skilled French language tutor. Your task is to review the user's message in French, correct any grammatical or vocabulary mistakes, and provide a short explanation for the corrections. If the message is perfect, give positive feedback. Keep it concise but educational.`
          },
          {
            role: 'user',
            content: `Here is the student's message in French: "${text}". Please provide feedback and corrections.`
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    return json({ feedback: data.choices[0].message.content });
  } catch (error) {
    console.error('GPT Error:', error);
    return json({ error: 'Failed to get feedback' }, { status: 500 });
  }
};