import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UniversalModule } from 'angular2-universal';

import { routing } from './app.routes';

//////////////////////////////////////////
// DECLARTIONS                          //
//////////////////////////////////////////

// Super Users
import { SuperUser } from './app/super/component';

// Users
import { Login } from './app/users/login/component';
import { Register } from './app/users/register/component';
import { ForgotPassword } from './app/users/forgot-password/component';
import { ResetPassword } from './app/users/reset-password/component';
import { Settings } from './app/users/settings/component';

// Properties
import { PropertyView } from './app/properties/property-view/component';
import { PropertyImages } from './app/properties/property-images/component';
import { PropertyReviews } from './app/properties/property-reviews/component';
import { SimilarProperties } from './app/properties/similar-properties/component';
import { PropertyPreview } from './app/properties/property-preview/component'
import { PropertyAmenities } from './app/properties/property-amenities/component';
import { PropertyActionsGroup } from './app/properties/property-actions-group/component';
import { PropertyEditImage } from './app/properties/property-edit-image/component';
import { PropertyEdit } from './app/properties/property-edit/component';
import { RentNow } from './app/properties/rent-now/component';
import { NoPropertyInfo } from './app/properties/no-property-info/component';

// Other
import { App } from './app/component';
import { StickyFooter } from './app/footer/component';
import { Welcome } from './app/welcome/component';
import { FAQ } from './app/faq/component';
import { PrivacyPolicy } from './app/privacy-policy/component';
import { Dashboard } from './app/dashboard/component';
import { MissingResource } from './app/missing-resource/component';
import { HomePage } from './app/home-page/component';

// Components
import { Carousel } from './app/components/carousel/component';
import { ControlMessages } from './app/components/control-messages/component';
import { ImageUpload } from './app/components/image-upload/component';
import { NumberTicker } from './app/components/number-ticker/component';
import { PropertyMap } from './app/components/property-map/component';
import { Slide } from './app/components/slide/component';
import { UploadProgress } from './app/components/upload-progress/component';
import { PropertySlider } from './app/components/property-slider/component';
import { PropertyFilters } from './app/components/property-filters/component';
import { PropertyAccordion } from './app/components/property-accordion/component';
import { Logo } from './app/components/logo/component';
import { TopBar } from './app/components/top-bar/component';

// Pipes
import { SimpleSearchPipe } from './app/pipes/simple-search.pipe';

// Services
import { UserService } from './app/users/user.service';
import { PropertyService } from './app/properties/property.service';
import { PropertyActionStateService } from './app/properties/property-action-state.service';
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

export const DECLARTIONS = [
  Login, Register, ForgotPassword, ResetPassword, Settings, PropertyView, PropertyImages, PropertyReviews,
  SimilarProperties, PropertyPreview, PropertyAmenities, PropertyActionsGroup, PropertyEditImage, PropertyEdit,
  RentNow, StickyFooter, Welcome, FAQ, PrivacyPolicy, Dashboard, HomePage, SimpleSearchPipe, Carousel, ControlMessages,
  ImageUpload, NumberTicker, PropertyMap, Slide, UploadProgress, PropertySlider, PropertyFilters, PropertyAccordion, 
  MissingResource, App, Logo, TopBar, SuperUser, NoPropertyInfo
];

export const PROVIDERS = [
  UserService, PropertyService, FacetsService, GoogleApiService, HttpService, ImageUploadService, SeoService,
  SocialService, UtilService, ValidationService, PersistenceService, PropertyActionStateService
];

export const IMPORTS = [
  FormsModule,
  ReactiveFormsModule,
  routing,
  UniversalModule,
];

@NgModule({
  bootstrap: [App],
  declarations: DECLARTIONS,
  imports: IMPORTS,
  providers: [
    ...PROVIDERS,
    { provide: Cookie, useClass: CookieNode },
  ],
})
export class MainModule {
}
