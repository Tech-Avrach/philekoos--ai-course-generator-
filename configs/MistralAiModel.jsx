import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.NEXT_PUBLIC_MISTRAL_API_KEY;

const client = new Mistral({apiKey: apiKey});

export const useMistralAi = async (prompt) => {

    console.log('Mistral AI Prompt:', prompt);

    const chatResponse = await client.chat.complete({
        model: 'mistral-large-latest',
        messages: [{role: 'user', content: prompt}],
      });
      
      console.log('Mistral AI Response:', chatResponse.choices[0].message.content);

      return chatResponse.choices[0].message.content
}