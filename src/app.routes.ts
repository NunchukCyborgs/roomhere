import { Routes, RouterModule } from '@angular/router';

import { Welcome } from './app/welcome/component';
import { FAQ } from './app/faq/component';
import { PrivacyPolicy } from './app/privacy-policy/component';
import { PropertyView } from './app/properties/property-view/component';

const routes: Routes = [
  { path: '', component: Welcome },
  { path: 'faq', component: FAQ },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'properties/:slug', component: PropertyView },
];

export const routing = RouterModule.forRoot(routes);