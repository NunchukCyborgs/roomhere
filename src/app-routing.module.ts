import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MissingResource } from './app/missing-resource/component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '**', component: MissingResource },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}

