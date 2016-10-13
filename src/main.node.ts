import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniversalModule } from 'angular2-universal';
import { AppRoutingModule } from './app.routes';
import { AccountModule } from './app/account/account.module';
import { SharedModule } from './app/shared/shared.module';

//////////////////////////////////////////
// DECLARTIONS                          //
//////////////////////////////////////////

import { App } from './app/component';

// Services
import { UserService } from './app/services/user.service';
import { PropertyService } from './app/services/property.service';
import { PropertyActionStateService } from './app/services/property-action-state.service';
import { FacetsService } from './app/services/facets.service';
import { GoogleApiService } from './app/services/google-api.service';
import { HttpService } from './app/services/http.service';
import { ImageUploadService } from './app/services/image-upload.service';
import { SeoService } from './app/services/seo.service';
import { SocialService } from './app/services/social.service';
import { UtilService } from './app/services/util.service';
import { ValidationService } from './app/services/validation.service';
import { PersistenceService } from './app/services/persistence.service';

//////////////////////////////////////////
// NODE SPECIFIC                        //
//////////////////////////////////////////

import { Cookie } from './app/services/cookies/cookie';
import { CookieNode } from './app/services/cookies/cookie-node';

export const PROVIDERS = [
  UserService, PropertyService, FacetsService, GoogleApiService, HttpService, ImageUploadService, SeoService,
  SocialService, UtilService, ValidationService, PersistenceService, PropertyActionStateService
];

export const IMPORTS = [
  SharedModule,
  AccountModule,
  // AppRoutingModule, Will have to pull out some sort of root routing here. With 404 stuff here. 
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
