import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';
import { ResponseMessage } from './response-message.decorator';

export const ApiOkMessage = (message: string) => {
  return applyDecorators(ResponseMessage(message), ApiOkResponse({ description: message }));
};

export const ApiCreatedMessage = (message: string) => {
  return applyDecorators(ResponseMessage(message), ApiCreatedResponse({ description: message }));
};

export const ApiNoContentMessage = (message: string) => {
  return applyDecorators(ResponseMessage(message), ApiNoContentResponse({ description: message }));
};
