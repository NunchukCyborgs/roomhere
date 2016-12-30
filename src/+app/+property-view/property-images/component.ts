import { Component, Input } from '@angular/core';
import { Slide } from '../../shared/components/slide/component';
import { Carousel } from '../../shared/components/carousel/component';
import { jQueryService } from '../../shared/services/jquery.service';

@Component({
  selector: 'property-images',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html'
})
export class PropertyImages {
  @Input() images: Array<{ id: number, url: string }>;
  @Input() interval: number;
  @Input() noLoop: boolean;

  public BASE_API_URL: string = BASE_API_URL;
  public slides: Array<{ image: string, text: string }>

  constructor(private jquery: jQueryService) { }

  ngOnChanges(changes: any) {
    this.slides = this.images.map(i => ({ image: i.url, text: '' }));

    this.jquery.loadFeatherlight()
      .map(() => this.jquery.jquery('property-images div.gallery'))
      .do(gallery => gallery.featherlightGallery({ type: 'image' }))
      .subscribe();
  }

  public openGallery() {
    this.jquery.loadFeatherlight()
      .do(() => this.jquery.jquery('.gallery-selector').click())
      .subscribe();
  }
}
