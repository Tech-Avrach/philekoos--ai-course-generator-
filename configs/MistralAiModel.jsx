import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.NEXT_PUBLIC_MISTRAL_API_KEY;

const client = new Mistral({apiKey: apiKey});

export const useMistralAi = async () => {
    const chatResponse = await client.chat.complete({
        model: 'mistral-large-latest',
        messages: [{role: 'user', content: 'What is the best French cheese?'}],
      });
      
      console.log('Chat:', chatResponse.choices[0].message.content);
}