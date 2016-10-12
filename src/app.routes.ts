import { Routes, RouterModule } from '@angular/router';

import { AccountPage } from './app/account/component';
import { Welcome } from './app/welcome/component';
import { FAQ } from './app/faq/component';
import { PrivacyPolicy } from './app/privacy-policy/component';
import { PropertyView } from './app/properties/property-view/component';
import { Settings } from './app/users/settings/component';
import { MissingResource } from './app/missing-resource/component';
import { UserSplash } from './app/users/user-splash/component';

import { DEFAULT_TENANT } from './app/config';

const routes: Routes = [
  { path: '', component: Welcome },
  { path: 'dashboard', component: AccountPage },
  { path: 'faq', component: FAQ },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: `${DEFAULT_TENANT}/:slug`, component: PropertyView },
  { path: 'settings', component: Settings },
  { path: 'registration-success', component: UserSplash },
  /*
   * For front end route auth, maybe move all auth routes nested under AccountPage?
  */
  { path: '**', component: MissingResource },
];

export const routing = RouterModule.forRoot(routes);
