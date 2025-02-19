import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
const OPENAI_API_KEY = env.OPENAI_API_KEY;

export const POST: RequestHandler = async ({ request }) => {
  const { messages } = await request.json();

  const chatMessages = messages.map((m: { sender: string; text: string }) => ({
    role: m.sender === 'user' ? 'user' : 'assistant',
    content: m.text,
  }));

  chatMessages.unshift({
    role: 'system',
    content: `
You are an expert French language tutor helping an English-speaking student learn French. 
Focus on:
- Correcting the student's mistakes gently.
- Explaining grammar rules, sentence structures, and pronunciation tips.
- Providing simple examples for beginners, and increasing complexity as the user progresses.
- Offering cultural insights about French language and customs.
- Encouraging the student to form their own French sentences.
- Asking open-ended questions to prompt the student to respond in French.
- Correcting their French, highlighting both mistakes and what they did well.
- Suggesting alternative, more natural ways to phrase sentences.
Your goal is to build the user's confidence and fluency in French.
`,
  });

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: chatMessages,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    const tutorMessage: string = data.choices[0].message.content;
    return json({ tutorMessage });
  } catch (error) {
    return json({ error: 'Error communicating with tutor API' }, { status: 500 });
  }
};