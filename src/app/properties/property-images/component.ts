import { Component, Input, AfterViewInit } from '@angular/core';
import { BASE_API_URL } from '../../config';
import { Slide } from '../../slide.component';
import { Carousel }  from '../../carousel.component';

declare let $: any;
declare let require: (string) => string;

@Component({
  moduleId: __filename,
  selector: 'property-images',
  directives: [Slide, Carousel],
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class PropertyImages {
  @Input() images: Array<{id: number, url: string}>;
  @Input() interval: number;
  @Input() noLoop: boolean;
  public BASE_API_URL: string = BASE_API_URL;
  public slides: Array<{image: string, text: string}>
  
  ngOnInit() {
    this.slides = this.images.map(i => {
        return {image: BASE_API_URL + i.url, text: ''};
      });
  }
}