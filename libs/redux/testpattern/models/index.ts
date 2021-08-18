export interface TestCall {
    Make_ID: number,
    Make_Name: string
}

export interface TestCallState {
    testCall: TestCall[],
    testCallFailedMessage: string,
    testCallCount: number
}

/**
 * Desired way of centralising models used throughout the library of your service + redux.
 * 
 * Make sure to at least have a definition of your state here, so that it can be referenced throughout your redux pattern,
 * such that any changes made here will reflect everywhere else
 * 
 * Possible better reflection techniques from C# can be used to loosly enforce typings on state contents throughout the
 * reduc pattern
 * 
 */