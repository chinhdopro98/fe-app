import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../reducers';

const testHandlerSelector = (state: RootState) => state.messages;

export const testHandlerFullInfo = createSelector(testHandlerSelector, testState => testState);