import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniversalModule } from 'angular2-universal';

import { SharedRoutingModule } from './shared-routing.module'

// Users
import { Login } from '../../app/users/login/component';
import { Register } from '../../app/users/register/component';
import { ForgotPassword } from '../../app/users/forgot-password/component';
import { ResetPassword } from '../../app/users/reset-password/component';

// Properties // TODO: move to properties module
import { PropertyView } from '../../app/properties/property-view/component';
import { PropertyImages } from '../../app/properties/property-images/component';
import { PropertyReviews } from '../../app/properties/property-reviews/component';
import { SimilarProperties } from '../../app/properties/similar-properties/component';
import { PropertyPreview } from '../../app/properties/property-preview/component'
import { PropertyAmenities } from '../../app/properties/property-amenities/component';
import { PropertyActionsGroup } from '../../app/properties/property-actions-group/component';
import { PropertyEditImage } from '../../app/properties/property-edit-image/component';
import { PropertyEdit } from '../../app/properties/property-edit/component';
import { RentNow } from '../../app/properties/rent-now/component';
import { NoPropertyInfo } from '../../app/properties/no-property-info/component';

// Other
import { App } from '../../app/component';
import { BigFooter } from '../../app/footer/component';
import { Welcome } from '../../app/welcome/component';
import { WelcomeFilters } from '../../app/welcome/filters/component';
import { FAQ } from '../../app/faq/component';
import { PrivacyPolicy } from '../../app/privacy-policy/component';
import { MissingResource } from '../../app/missing-resource/component';

// Components
import { Carousel } from './components/carousel/component';
import { ControlMessages } from './components/control-messages/component';
import { ImageUpload } from './components/image-upload/component';
import { NumberTicker } from './components/number-ticker/component';
import { PropertyMap } from './components/property-map/component';
import { Slide } from './components/slide/component';
import { UploadProgress } from './components/upload-progress/component';
import { PropertySlider } from './components/property-slider/component';
import { PropertyFilters } from './components/property-filters/component';
import { PropertyAccordion } from './components/property-accordion/component';
import { Logo } from './components/logo/component';
import { TopBar } from './components/top-bar/component';
import { Modal } from './components/modal/component';

// Pipes
import { SimpleSearchPipe } from './pipes/simple-search.pipe';

// Services?
import { WelcomeResolve } from '../welcome/welcome-resolve.service';
import { PropertyViewResolve } from '../properties/property-view/property-resolve.service';

export const DECLARTIONS = [
  Login, Register, ForgotPassword, ResetPassword, PropertyView, PropertyImages, PropertyReviews,
  SimilarProperties, PropertyPreview, PropertyAmenities, PropertyActionsGroup, PropertyEditImage, PropertyEdit,
  RentNow, BigFooter, Welcome, FAQ, PrivacyPolicy, PropertyMap, Slide, PropertySlider, PropertyFilters, PropertyAccordion,
  MissingResource, App, Logo, TopBar, NoPropertyInfo,
  SimpleSearchPipe, Carousel, ControlMessages, ImageUpload, NumberTicker, UploadProgress, Modal, WelcomeFilters,
  // Dashboard, AccountPage, SuperUser, Settings, UserSplash
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UniversalModule,
    SharedRoutingModule,
  ],
  declarations: DECLARTIONS,
  exports: [
    ...DECLARTIONS,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UniversalModule,
  ],
  providers: [
    WelcomeResolve,
    PropertyViewResolve,
  ],
})
export class SharedModule { }
