import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPage } from './app/account/component';
import { Welcome } from './app/welcome/component';
import { FAQ } from './app/faq/component';
import { PrivacyPolicy } from './app/privacy-policy/component';
import { PropertyView } from './app/properties/property-view/component';
// import { Settings } from './app/users/settings/component';
import { MissingResource } from './app/missing-resource/component';
// import { UserSplash } from './app/users/user-splash/component';

import { DEFAULT_TENANT } from './app/config';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: Welcome }, // Welcome Module

      { path: `${DEFAULT_TENANT}/:slug`, component: PropertyView }, // Property Module

      // { path: 'settings', component: Settings }, // account
      // { path: 'registration-success', component: UserSplash }, // account
      // { path: 'account', component: AccountPage }, // account

      { path: 'faq', component: FAQ }, // General
      { path: 'privacy-policy', component: PrivacyPolicy }, // General
      // { path: '**', component: MissingResource }, TODO: Add back 404ing
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}

