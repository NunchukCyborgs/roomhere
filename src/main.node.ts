import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UniversalModule } from 'angular2-universal';

import { App } from './app/app.component';
import { routing } from './app.routes';

import { Login, Register, ForgotPassword, ResetPassword, UserService } from './app/users/index';
import { StickyFooter } from './app/footer/component';
import { Welcome } from './app/welcome/component';
import { FAQ } from './app/faq/component';
import { PrivacyPolicy } from './app/privacy-policy/component';

import { ALL_COMPONENTS } from './app/components/index';
import { ALL_COMPONENTS as ALL_PROPERTY_COMPONENTS, PropertyService, PropertyActionStateService } from './app/properties/index';
import { ALL_SERVICES } from './app/services/index';

export function main(config) {
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
      UniversalModule.withConfig({
        document: config.document,
        originUrl: 'http://localhost:3000',
        baseUrl: '/',
        requestUrl: '/',
        preboot: { appRoot: ['app'], uglify: false },
        /*
          Uglify is throwing a zone error
          Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten ...
        */
      }),
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
      routing,
    ],
    providers: [
      ...ALL_SERVICES,
      UserService,
      PropertyService,
      PropertyActionStateService,
    ],
  })
  class MainModule {
  }
  return MainModule;
}


