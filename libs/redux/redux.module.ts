import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule, EffectsRootModule, EffectSources } from '@ngrx/effects';

import { reducers, effects } from '../redux/index';


@NgModule({
  imports: [
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers)
  ],
  providers: [
    EffectsRootModule,
    EffectSources
  ]
})
export class ReduxModule {}

/**
 * This module serves as a central location for importing ALL redux reducers and effects made on the application.
 * This module is then imported onto the main app.module.ts, which will unlooad all of the root specifcations made in the ReduxModule.
 * 
 * EffectsModule.forRoot(effects): registers ALL effects made for application to have root access over. Enables reducers to detect and invoke effects
 * on action dispatching
 * 
 * StoreModule.forRoot(reducers): registers ALL reducers made for application to have root access over. Enables ngrx library to detect 
 * and invoke reducer contents on action dispatching.
 * 
 */