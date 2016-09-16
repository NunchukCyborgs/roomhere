import { NgModule } from '@angular/core'; // Renderer?
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UniversalModule, isBrowser } from 'angular2-universal';

import { App } from './app/app.component';
import { routing } from './app.routes';

import { Login, Register, ForgotPassword, ResetPassword, UserService } from './app/users/index';
import { StickyFooter } from './app/footer/component';
import { Welcome } from './app/welcome/component';
import { FAQ } from './app/faq/component';
import { PrivacyPolicy } from './app/privacy-policy/component';

import { ALL_COMPONENTS } from './app/components/index';
import { ALL_COMPONENTS as ALL_PROPERTY_COMPONENTS, PropertyActionStateService } from './app/properties/index';
import { ALL_SERVICES } from './app/services/index';

import { PropertyService } from './app/properties/property.service';

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
  ],
})
export class MainModule {
}
