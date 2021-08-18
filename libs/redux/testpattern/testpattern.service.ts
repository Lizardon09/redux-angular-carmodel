import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as actions from './actions';
import * as TestCallModels from './models';
import * as stores from './selectors';
import { GlobalState } from '../index';

@Injectable({ providedIn: 'root' })
export class TestPatternService {

    constructor(private store: Store<GlobalState>) {

    }

    public getTestCall$(): Observable<TestCallModels.TestCall[]> {
        return this.store.select(stores.selectTestCall);
    }

    public getTestCallFailedMessage$(): Observable<string> {
        return this.store.select(stores.selectTestCallFailedMessage);
    }

    public getTestCallCount$(): Observable<number> {
        return this.store.select(stores.selectTestCallCount);
    }

    public testCall() {
        console.log("dispatch action");
        this.dispatch(actions.testCall());
    }

    private dispatch(action: Action) {
        this.store.dispatch(action);
    }

}

/**
 * This file is where the magic happens. It represents the collation of ALL
 * parts of the domains redux pattern in an accessable service that can
 * be injected into any component to allow access to the domains state.
 * 
 * The main import is the Store from the ngrx angular library, which will
 * enable action dispatching and selects to be made within this service.
 * 
 * We inject the Store in the service through construction injection.
 * 
 * The service contains 3 major components:
 * 
 * observable select methods - to retrieve sections of the state within the store
 * action dispatchers - to dispatch actions
 * MAIN action dispatcher - to process the action dispatchers methods' actions, and dispatch to the store
 * 
 * We have a main dispatch method, that takes in an action that will be dispatched to the store.
 * This method is infered in all upper level public action dispatch methods of the service, and is pirvately used
 * within the service.
 * 
 * The various action dispatchers methods will pass down any parameters and the action to be dispatached, to the
 * main dispatch method that will be performed on the store. These methods will use the actions imported from 
 * the domians' action definitions created in 'actions/index.ts'
 * 
 * the observable selector methods return a observable that can be subscribed OR piped to on the 
 * component layer, where this service is injected and used, to allow for the component layer
 * to listen for changes made in specific parts of the sate.
 * 
 * This is achieved by importing the statc section mapping functions created in 'selectors/index.ts', and inferring them
 * within store selects which naturally return observables. So we essentially select from the store for the speicifc
 * state section mapping we pass through via a function.
 * 
 * Note: ensure that the GlobalState, defined within 'redux/index.ts', is imported and infered as the Stores state, which will
 * allow the store to adjust and have the global access to ALL states defined within the GlobalState definition.
 */

