import { Subject ,  Observable } from 'rxjs';

export class ComponentLifetime {
    private _componentDestruction$ = new Subject<void>();

    isDestroyed$ = this._componentDestruction$.asObservable();

    constructor() { }

    onDestroy() {
        this._componentDestruction$.next();
    }

    // subscribeUntilDestroyed<T>(observable: Observable<T>, next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    //     return observable
    //         .takeUntil(this.isDestroyed$)
    //         .subscribe(next, error, complete);
    // }
}
