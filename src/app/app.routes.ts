import { RouterConfig } from '@angular/router';
import { Home } from './home';
import { About } from './app.component';
import { Welcome } from './welcome/welcome.component';

export const routes: RouterConfig = [
  { path: '', component: Welcome },
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: '**', redirectTo: 'home' }
];
