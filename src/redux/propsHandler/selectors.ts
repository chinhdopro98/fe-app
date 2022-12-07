import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../reducers';
const propsHandlerSelector = (state: RootState) => state.props
export const propsHandlerFullInfo = createSelector(propsHandlerSelector, propsState => propsState)