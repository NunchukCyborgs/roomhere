import { NgModule } from '@angular/core';
import { UniversalModule } from 'angular2-universal/browser';
import { App } from './app/component';
import { PROVIDERS, IMPORTS } from './main.node';
import { Cookie } from './app/shared/services/cookies/cookie';
import { CookieBrowser } from './app/shared/services/cookies/cookie-browser';

@NgModule({
  bootstrap: [App],
  declarations: [],
  imports: [
    ...IMPORTS,
    UniversalModule
  ],
  providers: [
    ...PROVIDERS,
    { provide: Cookie, useClass: CookieBrowser },
  ],
})
export class MainModule { }
