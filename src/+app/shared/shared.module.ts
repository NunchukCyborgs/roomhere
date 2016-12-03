import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Pipes
import { SimpleSearchPipe } from './pipes/simple-search.pipe';

// Services
import { UserService } from './services/user.service';
import { PropertyService } from './services/property.service';
import { ReviewsService } from './services/reviews.service';
import { PropertyActionStateService } from './services/property-action-state.service';
import { FacetsService } from './services/facets.service';
import { GoogleApiService } from './services/google-api.service';
import { HttpService } from './services/http.service';
import { ImageUploadService } from './services/image-upload.service';
import { SeoService } from './services/seo.service';
import { PropertySeoService } from './services/property-seo.service';
import { SocialService } from './services/social.service';
import { ValidationService } from './services/validation.service';
import { PersistenceService } from './services/persistence.service';
import { CacheService } from './services/cache.service';

import { PropertyViewResolve } from '../+property-view/property-resolve.service';

// Components
import { Carousel } from './components/carousel/component';
import { ControlMessages } from './components/control-messages/component';
import { ImageUpload } from './components/image-upload/component';
import { NumberTicker } from './components/number-ticker/component';
import { Slide } from './components/slide/component';
import { UploadProgress } from './components/upload-progress/component';
import { Logo } from './components/logo/component';
import { TopBar } from './components/top-bar/component';
import { Modal } from './components/modal/component';
import { StarRating } from './components/star-rating/component';
import { PropertyAmenities } from './components/property-amenities/component';
import { WelcomeSearch } from './components/welcome-search/component';
import { MissingResource } from './components/missing-resource/component';
import { PropertyPicker } from './components/property-picker/component';

import { Login } from './components/users/login/component';
import { Register } from './components/users/register/component';
import { ForgotPassword } from './components/users/forgot-password/component';
import { ResetPassword } from './components/users/reset-password/component';
import { BigFooter } from './components/big-footer/component';

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

const MODULES = [
  // Do NOT include UniversalModule, HttpModule, or JsonpModule here
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,

  DropDownsModule,
];

const PIPES = [
  SimpleSearchPipe,
];

const COMPONENTS = [
  Login, Register, ForgotPassword, ResetPassword, BigFooter, MissingResource,
  Slide, Logo, TopBar, WelcomeSearch, PropertyPicker,
  Carousel, ControlMessages, ImageUpload, NumberTicker, UploadProgress, Modal, StarRating, PropertyAmenities, 
];

const PROVIDERS = [
  UserService, PropertyService, FacetsService, GoogleApiService, HttpService, ImageUploadService, SeoService, PropertySeoService,
  SocialService, ValidationService, PersistenceService, PropertyActionStateService, ReviewsService, CacheService,

  PropertyViewResolve,
]

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...PIPES,
    ...COMPONENTS
  ],
  exports: [
    ...MODULES,
    ...PIPES,
    ...COMPONENTS
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ...PROVIDERS
      ]
    };
  }
}
