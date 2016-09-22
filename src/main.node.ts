import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UniversalModule } from 'angular2-universal';

import { App } from './app/app.component';
import { routing } from './app.routes';

import { Login, Register, ForgotPassword, ResetPassword, UserService } from './app/users/index';
import { StickyFooter } from './app/footer/component';
import { Welcome } from './app/welcome/component';
import { FAQ } from './app/faq/component';
import { PrivacyPolicy } from './app/privacy-policy/component';
import { Dashboard } from './app/dashboard/component';
import { Settings } from './app/users/settings/component';
import { MissingResource } from './app/missing-resource/component';

import { ALL_COMPONENTS } from './app/components/index';
import { ALL_COMPONENTS as ALL_PROPERTY_COMPONENTS, PropertyService, PropertyActionStateService } from './app/properties/index';
import { ALL_SERVICES } from './app/services/index';

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
    MissingResource,
    SimpleSearchPipe,
  ],
  imports: [
    UniversalModule,
    FormsModule,
    ReactiveFormsModule,
    // HttpModule, DANGER Do NOT use HttpModule, we use UniversalModule here instead
    routing,
  ],
  providers: [
    ...ALL_SERVICES,
    UserService,
    PropertyService,
    PropertyActionStateService,
  ],
})
export class MainModule {
}
