import { Component, Input } from '@angular/core';
import { Slide } from '../../shared/components/slide/component';
import { Carousel }  from '../../shared/components/carousel/component';
import { isBrowser } from 'angular2-universal';

declare let $ : any; // todo

@Component({
  selector: 'property-images',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html'
})
export class PropertyImages {
  @Input() images: Array<{id: number, url: string}>;
  @Input() interval: number;
  @Input() noLoop: boolean;
  public BASE_API_URL: string = BASE_API_URL;
  public slides: Array<{image: string, text: string}>

  ngOnChanges(changes: any) {
    this.slides = this.images.map(i => {
        return {image: i.url, text: ''};
      });
    if(isBrowser) {
      $('property-images div.gallery').featherlightGallery({
        type: 'image'
      });
    }
  }

  openGallery() {
    if(isBrowser) {
      $('.gallery-selector').click();
    }
  }
}
