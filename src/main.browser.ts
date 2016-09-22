import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniversalModule, isBrowser } from 'angular2-universal';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { App } from './app/app.component';
import { routing } from './app.routes';

import { Login, Register, ForgotPassword, ResetPassword, UserService } from './app/users/index';
import { StickyFooter } from './app/footer/component';
import { Welcome } from './app/welcome/component';
import { FAQ } from './app/faq/component';
import { PrivacyPolicy } from './app/privacy-policy/component';
import { Dashboard } from './app/dashboard/component';
import { Settings } from './app/users/settings/component';

import { ALL_COMPONENTS } from './app/components/index';
import { ALL_COMPONENTS as ALL_PROPERTY_COMPONENTS, PropertyActionStateService } from './app/properties/index';
import { ALL_SERVICES } from './app/services/index';

import { PropertyService } from './app/properties/property.service';
import { SimpleSearchPipe } from './app/pipes/simple-search.pipe';

@NgModule({
  bootstrap: [App],
  declarations: [
    ...ALL_COMPONENTS,
    ...ALL_PROPERTY_COMPONENTS,
    App,
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
    UniversalModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
  ],
  providers: [
    ...ALL_SERVICES,
    UserService,
    PropertyService,
    PropertyActionStateService,
    CookieService,
  ],
})
export class MainModule {
}
