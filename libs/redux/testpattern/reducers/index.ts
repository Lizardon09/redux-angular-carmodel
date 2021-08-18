import { Action, createReducer, on } from '@ngrx/store';
import * as TestCallModels from '@libraries/redux/testpattern/models';

import * as TestCallActions from '../actions';

export type State = TestCallModels.TestCallState;

export let initialValue: State = {
    testCall: [],
    testCallFailedMessage: "",
    testCallCount: 0
};

const testCallReducer = createReducer(

    initialValue,

    on(TestCallActions.testCall, state => ({ 
        ...state, 
        testCallCount: state.testCallCount + 1 
    })),

    on(TestCallActions.testCallSuccess, (state, action) => ({ 
        ...state, 
        testCall: action.payload 
    })),

    on(TestCallActions.testCallFailed, (state, action) => ({ 
        ...state, 
        testCallFailedMessage: action.payload 
    })),

  );
  

export function reducer
    (state: State = initialValue || undefined, action: Action) {
    console.log("Before Action", action);
    console.log("State", state);

    const temp = testCallReducer(state, action);
    console.log("After Action", action);
    console.log("State", temp);

    return temp;
};

/**
 * This file contains the reducer setup of the redux pattern of the specific domain
 * 
 * Every state created, must have an initial setup. We import the standard state definition of this domain
 * from the custom models/index.ts file, that contains all object definitions for the domains' library, and
 * alias it as a State definition that we will use throughout the reducer setup.
 * 
 * The initial state is a simple const object that is of type State, that was aliased above.
 * 
 * we create a function holder for the reducer function, created by using the ngrx library function 'createReducer',
 * which takes in an initial state value and any amount of action type cases.
 * 
 * 'on()' from the ngrx library associates and action type with a state cahneg specified. Consider the psuedo defintion
 * of it bellow:
 * 
 *      on(Action, Func( (satte, action) => {..state, prop1: action.payload, prop2: action.payload, ...} ))
 * 
 * If youve noticed, we are able to infer the payload from every action type defined within the reducer function:
 * 
 * this is due to the consistency established within the actions/index.ts file where for every action, we defined
 * the parameter of the props of the action as a payload. If we had named it unqiuely, we wouldve have to use those
 * unique names here as well.
 * 
 * Finally, we create a central reducer function that will proccess the current state and a dispatched action at
 * any point in time, which will return the state change defined within the lower reducer function made using
 * 'creatreducer()'
 * 
 */