import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as TestCallActions from '../actions';
import { TestCallApiService } from '../apis/testpattern-api.service';
 
@Injectable()
export class TestCallEffects {

    constructor(
        private actions$: Actions,
        private testCallApiService : TestCallApiService
    ) {}
 
    testCall$ = createEffect(() => this.actions$.pipe(
        ofType(TestCallActions.testCall),
        mergeMap(() => this.testCallApiService.getTestCall()
            .pipe(
                map(result => 
                    (TestCallActions.testCallSuccess({payload: result})),
                    catchError((err) => of(TestCallActions.testCallFailed({payload: err}))),
                )
            )
        )
    ));
}

/**
 * This file specifies the effects to be considered on action dispatching, during a resolution
 * of specific actions within the reducer.
 * 
 * Note: The redux/index.ts file collates ALL files like this under a common effects collaction, which gets
 * imported to root within the ReduxModule. If this files effects are not specified there, then the effects
 * will never trigger.
 * 
 * Apart from any api or custom made services, we import the Actions definitions from the ngrx library 
 * to pipe any action dispatches that are of the base type implimentation for Actions in redux, to go through an effect.
 * We also import the action defintions for the redux pattern of the domain that we have defined under 'actions/index.ts'
 * 
 * The name of the effect does not matter, the main concern is the definition created by 'createEffect':
 * 
 *  1 - Any action is piped through the effect function created...
 *  2 - ofType(actiontype) - which comes from the actions import we have done.
 *  3 - we perform a map on the action type (here we could access the payload of the action if it has any)
 *  4 - we perform our external code calls/requirements
 *  5 - we pipe and map the results obtained from those calls
 *  6 - we invoke either a success or failed action upon error catching
 * 
 *  we use the standard catchError method provided by angular core, to catch any thrown errors from calls made
 *  we use of to invoke the failed action as an oberverable within the catchError handling
 * 
 */