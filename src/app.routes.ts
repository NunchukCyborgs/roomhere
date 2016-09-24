import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './app/home-page/component';
import { FAQ } from './app/faq/component';
import { PrivacyPolicy } from './app/privacy-policy/component';
import { PropertyView } from './app/properties/property-view/component';
import { Settings } from './app/users/settings/component';
import { MissingResource } from './app/missing-resource/component';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'faq', component: FAQ },
  { path: 'faq/:extra', component: FAQ },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'properties/:slug', component: PropertyView },
  { path: 'settings', component: Settings },  
  { path: '**', component: MissingResource },
];

export const routing = RouterModule.forRoot(routes);
