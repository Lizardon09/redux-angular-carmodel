import { createAction, props } from '@ngrx/store';
import * as TestCallModels from '@libraries/redux/testpattern/models';

export const testCall = createAction(
    'TEST_CALL'
);

export const testCallSuccess = createAction(
    'TEST_CALL_SUCCESS',
    props<{ payload: TestCallModels.TestCall[]; }>()
)

export const testCallFailed = createAction(
    'TEST_CALL_Failed',
    props<{ payload: string; }>()
)

/**
 * This file specifies the actions to be considered for the Redux pattern of this domain
 * 
 * Think of each action has having the following implimentation:
 * 
 * export interface Action {
 *      type: string
 *      props?: object
 * }
 * 
 * where the props will represent the payload - which can either be a single object or a collection of objects
 * 
 * for consistency, the props parameter value is named payload so that references will be easier to make 
 * to the payload passing through the action on the reducer made
 * 
 * any action that doesnt pass anything, can just ommite the props part of the action definition
 * 
 */