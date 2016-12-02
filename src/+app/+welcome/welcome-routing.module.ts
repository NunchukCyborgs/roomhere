import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Welcome } from './component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: Welcome }
    ])
  ]
})
export class WelcomeRoutingModule { }
