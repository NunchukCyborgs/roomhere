import { RouterConfig } from '@angular/router';
import { Welcome } from './welcome/welcome.component';
import { PropertyView } from './properties/property-view.component';
import { PropertyEdit } from './properties/property-edit.component';
import { PrivacyPolicy } from './privacy-policy/component';
import { FAQ } from './faq/component';

export const routes: RouterConfig = [
  { path: '', component: Welcome },
  { path: 'faq', component: FAQ },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'properties/:slug', component: PropertyView},
  { path: 'properties/:slug/edit', component: PropertyEdit},
  { path: '**', redirectTo: '' }
];
