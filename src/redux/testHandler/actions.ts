import { createAction } from '@reduxjs/toolkit';
import type { testHandlerPayload } from './types';

export const testHandlerSet = createAction<testHandlerPayload>('MESSAGE_HANDLER_SET');
export const testHandlerReset = createAction('MESSAGE_HANDLER_RESET');