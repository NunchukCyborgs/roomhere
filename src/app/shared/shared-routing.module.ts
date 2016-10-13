import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPage } from '../account/component';
import { Welcome } from '../welcome/component';
import { FAQ } from '../faq/component';
import { PrivacyPolicy } from '../privacy-policy/component';
import { PropertyView } from '../properties/property-view/component';
import { MissingResource } from '../missing-resource/component';

import { DEFAULT_TENANT } from '../config';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: Welcome }, // Welcome Module
      { path: `${DEFAULT_TENANT}/:slug`, component: PropertyView }, // Property Module
      { path: 'faq', component: FAQ }, // General
      { path: 'privacy-policy', component: PrivacyPolicy }, // General
      // { path: '**', component: MissingResource }, TODO: Add back 404ing
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class SharedRoutingModule {}

