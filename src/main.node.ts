import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UniversalModule } from 'angular2-universal';

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
import { ALL_COMPONENTS as ALL_PROPERTY_COMPONENTS, PropertyService, PropertyActionStateService } from './app/properties/index';
import { ALL_SERVICES } from './app/services/index';

import { Cookie } from './app/services/cookies/cookie';
import { CookieNode } from './app/services/cookies/cookie-node';
import { SimpleSearchPipe } from './app/pipes/simple-search.pipe'; 

@NgModule({
  bootstrap: [App],
  declarations: [
    ...ALL_COMPONENTS,
    ...ALL_PROPERTY_COMPONENTS,
    PropertyView,
    App,
    Login,
    HomePage,
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
    // HttpModule, DANGER Do NOT use HttpModule, we use UniversalModule here instead
    routing,
    UniversalModule,
  ],
  providers: [
    ...ALL_SERVICES,
    UserService,
    PropertyService,
    PropertyActionStateService,
    { provide: Cookie, useClass: CookieNode },
  ],
})
export class MainModule {
}
