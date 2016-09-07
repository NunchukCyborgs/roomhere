import { Component, Input, AfterViewInit } from '@angular/core';
import { BASE_API_URL } from '../config';
import { Property } from './index'

declare let $: any;

@Component({
  moduleId: __filename,
  selector: 'property-edit-image',
  styles: [`
    .edit-property-image {
      height: 150px;
    }

    .image-delete {
      display:none;
      position:absolute;
      top: 0;
      right:36px;
      font-size: 30px;
      color: white;
      width:15px;
      height:15px;
    }

    .image-wrapper {
      position: relative;
    }

    .image-wrapper:hover .image-delete {
      display:block;
    }

    .image-delete:hover {
      color: #CCC;
    }

  `],
  template: `
    <div class="column image-wrapper">
      <img *ngIf="imageUrl" class="js-property-image edit-property-image" [src]="BASE_API_URL + imageUrl" />
      <a href="#" (click)="delete()" class="image-delete"><i class="fa fa-ban"></i></a>
    </div>
  `
})
export class PropertyEditImage {
  @Input() imageUrl: string;
  @Input() imageId: number;
  @Input() property: Property;
  public BASE_API_URL: string = BASE_API_URL;
}
