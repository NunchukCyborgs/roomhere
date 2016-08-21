import { Component, Input, AfterViewInit } from '@angular/core';
import { BASE_URL } from '../config';
declare let $: any;

@Component({
  moduleId: __filename,
  selector: 'property-images',
  styles: [`
  `],
  template: `
    <div class="orbit" role="region" aria-label="Pictures" data-orbit>
      <ul class="orbit-container">
        <button class="orbit-previous"><span class="show-for-sr">Previous Slide</span>&#9664;&#xFE0E;</button>
        <button class="orbit-next"><span class="show-for-sr">Next Slide</span>&#9654;&#xFE0E;</button>
        <li *ngFor="let image of images" class="orbit-slide">
          <img [src]="BASE_URL + image.url" class="orbit-image" />
          <figcaption class="orbit-caption"></figcaption>
        </li>
      </ul>
    </div>
  `
})
export class PropertyImages implements AfterViewInit {
  @Input() images: Array<{id: number, url: string}>;
  public BASE_URL: string = BASE_URL;
  ngAfterViewInit() {
    if ($) {
      $(document).foundation();
    }
  }
}
