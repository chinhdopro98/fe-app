import { createReducer } from "@reduxjs/toolkit";
import { testHandlerSet, testHandlerReset } from "./actions";

export interface ITestHandler{
    payloads: string | null
}
const initialState: ITestHandler = {
    payloads: null,
}
const testReducer = createReducer(initialState, {
    [testHandlerSet.type]: (state, action) => {
      state.payloads = action.payload.payloads;
      console.log('redux payload: ',action.payload.payloads)
    },
    [testHandlerReset.type]: state => {
      state.payloads = null
    },
  });
  
  export default testReducer;