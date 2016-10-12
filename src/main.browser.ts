import { NgModule } from '@angular/core';

import { App } from './app/component';
import { PROVIDERS, IMPORTS } from './main.node';
import { Cookie } from './app/services/cookies/cookie';
import { CookieBrowser } from './app/services/cookies/cookie-browser';

@NgModule({
  bootstrap: [App],
  declarations: [],
  imports: IMPORTS,
  providers: [
    ...PROVIDERS,
    { provide: Cookie, useClass: CookieBrowser },
  ],
})
export class MainModule { }
