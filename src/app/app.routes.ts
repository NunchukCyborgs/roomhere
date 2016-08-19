import { RouterConfig } from '@angular/router';
import { Welcome } from './welcome/welcome.component';

export const routes: RouterConfig = [
  { path: '', component: Welcome },
  { path: '**', redirectTo: '' }
];
