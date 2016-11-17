import { NgModule, Inject, Optional, SkipSelf } from '@angular/core';
import { UniversalModule, isBrowser, isNode } from 'angular2-universal/node'; // for AoT we need to manually split universal packages
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AccountModule } from './account/account.module';
import { SharedModule } from './shared/shared.module';


//////////////////////////////////////////
// DECLARTIONS                          //
//////////////////////////////////////////

import { AppComponent } from './component';

// Services
import { UserService } from './shared/services/user.service';
import { PropertyService } from './shared/services/property.service';
import { ReviewsService } from './shared/services/reviews.service';
import { PropertyActionStateService } from './shared/services/property-action-state.service';
import { FacetsService } from './shared/services/facets.service';
import { GoogleApiService } from './shared/services/google-api.service';
import { HttpService } from './shared/services/http.service';
import { ImageUploadService } from './shared/services/image-upload.service';
import { SeoService } from './shared/services/seo.service';
import { PropertySeoService } from './shared/services/property-seo.service';
import { SocialService } from './shared/services/social.service';
import { ValidationService } from './shared/services/validation.service';
import { PersistenceService } from './shared/services/persistence.service';

//////////////////////////////////////////
// NODE SPECIFIC                        //
//////////////////////////////////////////

import { Cookie } from './shared/services/cookies/cookie';
import { CookieNode } from './shared/services/cookies/cookie-node';

export const PROVIDERS = [
  UserService, PropertyService, FacetsService, GoogleApiService, HttpService, ImageUploadService, SeoService, PropertySeoService,
  SocialService, ValidationService, PersistenceService, PropertyActionStateService, ReviewsService
];

export const IMPORTS = [
  SharedModule,
  AccountModule,
  AppRoutingModule, 
];

export function getLRU(lru?: any) {
  // use LRU for node
  // return lru || new LRU(10);
  return lru || new Map();
}
export function getRequest() {
  return Zone.current.get('req') || {};
}
export function getResponse() {
  return Zone.current.get('res') || {};
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [],
  imports: IMPORTS,
  providers: [
    ...PROVIDERS,
    { provide: Cookie, useClass: CookieNode },


    { provide: 'isBrowser', useValue: isBrowser },
    { provide: 'isNode', useValue: isNode },

    { provide: 'req', useFactory: getRequest },
    { provide: 'res', useFactory: getResponse },

    {
      provide: 'LRU',
      useFactory: getLRU,
      deps: [ [new Inject('LRU'), new Optional(), new SkipSelf()] ]
    },

    // CacheService
  ],
})
export class MainModule {
//   constructor(public cache: CacheService) {

//   }

//   /**
//    * We need to use the arrow function here to bind the context as this is a gotcha
//    * in Universal for now until it's fixed
//    */
//   universalDoDehydrate = (universalCache) => {
//     universalCache[CacheService.KEY] = JSON.stringify(this.cache.dehydrate());
//   }

//  /**
//   * Clear the cache after it's rendered
//   */
//   universalAfterDehydrate = () => {
//     // comment out if LRU provided at platform level to be shared between each user
//     this.cache.clear();
//   }
}
