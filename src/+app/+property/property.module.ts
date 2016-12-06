import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PropertyMap } from './property-map/component';
import { PropertyAccordion } from './property-accordion/component';
import { PropertyEditImage } from './property-edit-image/component';
import { PropertyEdit } from './property-edit/component';
import { PropertyPreview } from './property-preview/component';


const components = [
  PropertyMap,
  PropertyAccordion,
  PropertyEdit,
  PropertyEditImage,
  PropertyPreview,
];

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class PropertyModule { }
