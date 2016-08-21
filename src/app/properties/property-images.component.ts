import { Component, Input, AfterViewInit } from '@angular/core';

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
          <img [src]="image.url" class="orbit-image" />
          <figcaption class="orbit-caption"></figcaption>
        </li>
      </ul>
    </div>
  `
})
export class PropertyImages implements AfterViewInit {
  @Input() images: string[];

  ngAfterViewInit() {
    if ($) {
      $(document).foundation();
    }
  }
}
