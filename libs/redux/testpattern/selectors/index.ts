import { GlobalState } from '@libraries/redux/index';

export type AppState = GlobalState;

export const selectTestCall = (state: AppState) => {console.log("Inside Selector detection of testCall array",state.testCallState?.testCall); return state.testCallState?.testCall};
export const selectTestCallFailedMessage = (state: AppState) => state.testCallState?.testCallFailedMessage;
export const selectTestCallCount = (state: AppState) => state.testCallState?.testCallCount;

/**
 * This file contains the function mappings for state sections, that are used within your libraries main service handling the entire redux
 * pattern, for retrieving certain parts of a given state
 * 
 * The key here is the imported GlobalState, which is defined in the main index of the redux custom library folder.
 * The GlobalState collates ALL of the state definitions made for the entire application for ALL redux patterns made.
 * 
 * By importing and scoping to a local definition, AppSate, will enable use to utilize and access any of the other states
 * that have been mapped within the GlobalState - thus the individual sections of a specific state chosen.
 * 
 * Note that specific state infernces are made with '?' for situations that initila state values are null/undefined
 * 
 */