import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniversalModule } from 'angular2-universal';

import { AppRoutingModule } from '../../app.routes'

// Super Users
// import { SuperUser } from '../../app/account/super/component';
import { SuperLicensing } from '../../app/account/super/licensing/component';

// Users
import { Login } from '../../app/users/login/component';
import { Register } from '../../app/users/register/component';
import { ForgotPassword } from '../../app/users/forgot-password/component';
import { ResetPassword } from '../../app/users/reset-password/component';
import { Settings } from '../../app/users/settings/component';
import { UserSplash } from '../../app/users/user-splash/component';

// Properties
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
import { FAQ } from '../../app/faq/component';
import { PrivacyPolicy } from '../../app/privacy-policy/component';
// import { Dashboard } from '../../app/account/dashboard/component';
import { MissingResource } from '../../app/missing-resource/component';
// import { AccountPage } from '../../app/account/component';

// Components
import { Carousel } from '../../app/components/carousel/component';
import { ControlMessages } from '../../app/components/control-messages/component';
import { ImageUpload } from '../../app/components/image-upload/component';
import { NumberTicker } from '../../app/components/number-ticker/component';
import { PropertyMap } from '../../app/components/property-map/component';
import { Slide } from '../../app/components/slide/component';
import { UploadProgress } from '../../app/components/upload-progress/component';
import { PropertySlider } from '../../app/components/property-slider/component';
import { PropertyFilters } from '../../app/components/property-filters/component';
import { PropertyAccordion } from '../../app/components/property-accordion/component';
import { Logo } from '../../app/components/logo/component';
import { TopBar } from '../../app/components/top-bar/component';

// Pipes
import { SimpleSearchPipe } from '../../app/pipes/simple-search.pipe';


export const DECLARTIONS = [
  Login, Register, ForgotPassword, ResetPassword, Settings, PropertyView, PropertyImages, PropertyReviews,
  SimilarProperties, PropertyPreview, PropertyAmenities, PropertyActionsGroup, PropertyEditImage, PropertyEdit,
  RentNow, BigFooter, Welcome, FAQ, PrivacyPolicy, PropertyMap, Slide, PropertySlider, PropertyFilters, PropertyAccordion,
  MissingResource, App, Logo, TopBar, NoPropertyInfo, SuperLicensing, UserSplash,
  SimpleSearchPipe, Carousel, ControlMessages, ImageUpload, NumberTicker, UploadProgress,
  // Dashboard, AccountPage, SuperUser
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UniversalModule,
    AppRoutingModule,
  ],
  declarations: DECLARTIONS,
  exports: [
    ...DECLARTIONS,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UniversalModule,
  ]
})
export class SharedModule { }
