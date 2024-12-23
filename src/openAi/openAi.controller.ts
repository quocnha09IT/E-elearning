import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OpenAiService } from './openai.service';

@Controller('message')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Post()
  async sendMessage(@Body('message') message: string) {
    console.log(message)
    try {
      const response = await this.openAiService.getChatResponse(message);
      return { message: response };
    } catch (error) {
      throw new HttpException(
        { error: error.message || 'Failed to process your request' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
