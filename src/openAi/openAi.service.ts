import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey:
        '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',
    });
  }

  async getChatResponse(message: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini', // Hoặc model khác như gpt-3.5-turbo nếu được
        messages: [{ role: 'user', content: message }],
        temperature: 0,
        max_tokens: 256,
      });

      const choice = response.choices[0];

      if (!choice?.message?.content) {
        throw new Error('No valid response from OpenAI API');
      }
      console.log(choice.message.content.trim())
      return choice.message.content.trim();
    } catch (error) {
      console.error('OpenAI API Error:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.error?.message || 'Internal Server Error',
      );
    }
  }
}
