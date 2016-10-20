import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniversalModule } from 'angular2-universal';
import { AppRoutingModule } from './app-routing.module';
import { AccountModule } from './app/account/account.module';
import { SharedModule } from './app/shared/shared.module';

//////////////////////////////////////////
// DECLARTIONS                          //
//////////////////////////////////////////

import { App } from './app/component';

// Services
import { UserService } from './app/shared/services/user.service';
import { PropertyService } from './app/shared/services/property.service';
import { PropertyActionStateService } from './app/shared/services/property-action-state.service';
import { FacetsService } from './app/shared/services/facets.service';
import { GoogleApiService } from './app/shared/services/google-api.service';
import { HttpService } from './app/shared/services/http.service';
import { ImageUploadService } from './app/shared/services/image-upload.service';
import { SeoService } from './app/shared/services/seo.service';
import { SocialService } from './app/shared/services/social.service';
import { ValidationService } from './app/shared/services/validation.service';
import { PersistenceService } from './app/shared/services/persistence.service';

//////////////////////////////////////////
// NODE SPECIFIC                        //
//////////////////////////////////////////

import { Cookie } from './app/shared/services/cookies/cookie';
import { CookieNode } from './app/shared/services/cookies/cookie-node';

export const PROVIDERS = [
  UserService, PropertyService, FacetsService, GoogleApiService, HttpService, ImageUploadService, SeoService,
  SocialService, ValidationService, PersistenceService, PropertyActionStateService
];

export const IMPORTS = [
  SharedModule,
  AccountModule,
  AppRoutingModule, 
];

@NgModule({
  bootstrap: [App],
  declarations: [],
  imports: IMPORTS,
  providers: [
    ...PROVIDERS,
    { provide: Cookie, useClass: CookieNode },
  ],
})
export class MainModule {
}
