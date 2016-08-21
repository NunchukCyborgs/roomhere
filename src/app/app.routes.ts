import { RouterConfig } from '@angular/router';
import { Welcome } from './welcome/welcome.component';
import { PropertyView } from './properties/property-view.component';

export const routes: RouterConfig = [
  { path: '', component: Welcome },
  { path: 'properties/:slug', component: PropertyView},
  { path: '**', redirectTo: '' }
];
