import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DisplayWindowComponent } from './components/display-window/display-window.component';
import { KeypadButtonComponent } from './components/keypad-button/keypad-button.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayWindowComponent,
    KeypadButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [], // use '@Injectable providedIn' now
  bootstrap: [AppComponent]
})
export class AppModule { }
