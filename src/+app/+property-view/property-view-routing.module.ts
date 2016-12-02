import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PropertyView } from './component';
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: PropertyView },
    ])
  ]
})
export class PropertyViewRoutingModule { }
