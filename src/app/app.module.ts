import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestReduxComponent } from './test-redux/test-redux.component';
import { ReduxModule } from '@libraries/redux/redux.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TestReduxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

/**
 * Note: Ensure the ReduxModule from the custom lbraries folder is imported within the AppModule here 
 * so that the entire application will have access to ALL redux patterns defined within the libraries
 * folder
 */
