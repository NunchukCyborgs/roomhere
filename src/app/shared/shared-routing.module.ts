import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPage } from '../account/component';
import { Welcome } from '../welcome/component';
import { FAQ } from '../faq/component';
import { PrivacyPolicy } from '../privacy-policy/component';
import { PropertyView } from '../properties/property-view/component';
import { MissingResource } from '../missing-resource/component';
import { ResetPassword } from '../users/reset-password/component';
import { LandingPageLandlord } from '../pages/landlord-page/component';
import { LandingPageTenant } from '../pages/tenant-page/component';

import { DEFAULT_TENANT } from '../config';
import { WelcomeResolve } from '../welcome/welcome-resolve.service';
import { PropertyViewResolve } from '../properties/property-view/property-resolve.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: Welcome, resolve: { properties: WelcomeResolve } }, // Welcome Module
      { path: `${DEFAULT_TENANT}/:slug`, component: PropertyView, resolve: { property: PropertyViewResolve } }, // Property Module
      { path: 'faq', component: FAQ }, // General
      { path: 'privacy-policy', component: PrivacyPolicy }, // General
      { path: 'reset-password', component: ResetPassword }, // General
      { path: 'cape-girardeau-landlords', component: LandingPageLandlord }, // Landing Pages Module
      { path: 'cape-girardeau-tenants', component: LandingPageTenant }, // Landing Pages Module
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class SharedRoutingModule { }

