export async function sendMessageToTutor(messageHistory: any): Promise<{ tutorMessage: string }> {
    const response = await fetch('/api/tutor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messages: messageHistory })
    });
    if (!response.ok) {
      throw new Error('Failed to fetch tutor response');
    }
    return response.json();
  }