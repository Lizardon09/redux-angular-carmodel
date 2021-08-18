import * as fromTestCall from '../redux/testpattern/reducers'
import { TestCallEffects } from '../redux/testpattern/effects'

export const effects = [
    TestCallEffects
]

export const reducers = {
    testCallState : fromTestCall.reducer
}
  
export interface GlobalState {
    testCallState: fromTestCall.State
}

/**
 * Always make sure that the reducer property assignment for reducers and states that pertain to the same domain,
 * must thave the SAME property name assignment in both the reducers and GlobalState.
 * 
 * The above does the following:
 * 
 * effects: collates all effects imports that gets exported onto the custom ReduxModule for adding to Root
 * 
 * reducers: collates all reducer imports that gets exported onto the custom ReduxModule for adding to Root
 * 
 * GlobalState: collates all state definition importas that gets exported to ALL selectors created, which gets aliased as an AppState
 * the specific selector file that will enable access to ALL state definitions on a state selection - thus access to the specific state
 * desired with all of the properties at the time.
 * 
 */