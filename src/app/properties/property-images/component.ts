import { Component, Input } from '@angular/core';
import { Slide } from '../../components/slide/component';
import { Carousel }  from '../../components/carousel/component';
import { isBrowser } from 'angular2-universal';

declare let $ : any;

@Component({
  selector: 'property-images',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class PropertyImages {
  @Input() images: Array<{id: number, url: string}>;
  @Input() interval: number;
  @Input() noLoop: boolean;
  public BASE_API_URL: string = BASE_API_URL;
  public slides: Array<{image: string, text: string}>

  ngOnChanges() {
    this.slides = this.images.map(i => {
        return {image: i.url, text: ''};
      });
  }

  openGallery() {
    if(isBrowser) {
      $('.gallery-selector').click();
    }
  }
}
