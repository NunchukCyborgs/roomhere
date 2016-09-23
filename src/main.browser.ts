import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniversalModule, isBrowser } from 'angular2-universal';

import { App } from './app/component';
import { routing } from './app.routes';

import { HomePage } from './app/home-page/component';
import { Login, Register, ForgotPassword, ResetPassword, UserService } from './app/users/index';
import { StickyFooter } from './app/footer/component';
import { Welcome } from './app/welcome/component';
import { FAQ } from './app/faq/component';
import { PrivacyPolicy } from './app/privacy-policy/component';
import { Dashboard } from './app/dashboard/component';
import { Settings } from './app/users/settings/component';

import { PropertyView } from './app/properties/property-view/component';
import { ALL_COMPONENTS } from './app/components/index';
import { ALL_COMPONENTS as ALL_PROPERTY_COMPONENTS, PropertyActionStateService } from './app/properties/index';
import { ALL_SERVICES } from './app/services/index';

import { Cookie } from './app/services/cookies/cookie';
import { CookieBrowser } from './app/services/cookies/cookie-browser';
import { PropertyService } from './app/properties/property.service';
import { SimpleSearchPipe } from './app/pipes/simple-search.pipe';

@NgModule({
  bootstrap: [App],
  declarations: [
    ...ALL_COMPONENTS,
    ...ALL_PROPERTY_COMPONENTS,
    PropertyView,
    App,
    HomePage,
    Login,
    Register,
    ForgotPassword,
    ResetPassword,
    StickyFooter,
    Welcome,
    FAQ,
    PrivacyPolicy,
    Dashboard,
    Settings,
    SimpleSearchPipe,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    routing,
    UniversalModule,
  ],
  providers: [
    ...ALL_SERVICES,
    UserService,
    PropertyService,
    PropertyActionStateService,
    { provide: Cookie, useClass: CookieBrowser },
  ],
})
export class MainModule {
}
