import { Component, Input } from '@angular/core';
import { BASE_API_URL } from '../../config';
import { Slide } from '../../components/slide/component';
import { Carousel }  from '../../components/carousel/component';

@Component({
  selector: 'property-images',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class PropertyImages {
  @Input() images: Array<{id: number, url: string}>;
  @Input() interval: number;
  @Input() noLoop: boolean;
  public BASE_API_URL: string = BASE_API_URL;
  public slides: Array<{image: string, text: string}>
  
  ngOnChanges() {
    this.slides = this.images.map(i => {
        return {image: BASE_API_URL + i.url, text: ''};
      });
  }
}
