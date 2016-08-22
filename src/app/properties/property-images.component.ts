import { Component, Input, AfterViewInit } from '@angular/core';
import { BASE_URL } from '../config';
import { Slide } from '../slide.component';
import { Carousel }  from '../carousel.component';

declare let $: any;

@Component({
  moduleId: __filename,
  selector: 'property-images',
  directives: [Slide, Carousel],
  styles: [`
    .item.carousel-item {
      opacity: 0;
      transition: opacity 0.4s ease-in;
      -ms-transition: opacity 0.4s ease-in;
      -moz-transition: opacity 0.4s ease-in;
      -webkit-transition: opacity 0.4s ease-in;
    }
    
    .item.carousel-item.active {
        opacity: 1;
        transition: opacity 0.4s ease-out;
        -ms-transition: opacity 0.4s ease-out;
        -moz-transition: opacity 0.4s ease-out;
        -webkit-transition: opacity 0.4s ease-out;
    }​

    carousel {
      width: 100%;
    }

    carousel, .image {
      height: 550px !important;
    }

    .image {
      background-repeat: no-repeat;
      background-size: cover;
    }

    @media (max-width: 1024px) {
      carousel, .image {
        height: 500px !important;
      }
    }

    @media (max-width: 640px) {
      carousel, .image {
        height: 400px !important;
      }
    }

    @media (max-width: 480px) {
      carousel, .image {
        height: 300px !important;
      }
    }
  `],
  template: `
     <carousel [interval]="interval" [noWrap]="noLoop">
       <slide *ngFor="let slidez of slides; let i=index" [active]="slidez.active">
        <div [style.background-image]="'url(' + slidez.image + ')'" class="image"></div>
      </slide>
    </carousel>
  `
})
export class PropertyImages {
  @Input() images: Array<{id: number, url: string}>;
  @Input() interval: number; // get defaults somehow
  @Input() noLoop: boolean;
  public BASE_URL: string = BASE_URL;
  public slides: Array<{image: string, text: string}>
  
  ngOnInit() {
    this.slides = this.images.map(i => {
        return {image: BASE_URL + i.url, text: ''};
      });
  }
}

/*

<div class="carousel-caption">
          <h3 style="background-color: transparent;color: white;">Slide {{i + 1}}</h3>
          <p style="background-color: transparent;color: white;">{{slidez.text}}</p>
        </div>


 <ul class="orbit-container">
        <button class="orbit-previous"><span class="show-for-sr">Previous Slide</span>&#9664;&#xFE0E;</button>
        <button class="orbit-next"><span class="show-for-sr">Next Slide</span>&#9654;&#xFE0E;</button>
        <li *ngFor="let image of images" class="orbit-slide" >
          <div [style.background-image]="'url(' + BASE_URL + image.url + ')'" class="orbit-image2"></div>
          <figcaption class="orbit-caption2"></figcaption>
        </li>
      </ul>


      <carousel [interval]="NextPhotoInterval" [noWrap]="noLoopSlides">
       <slide *ngFor="let slidez of slides; let i=index" [active]="slidez.active">
        <img [src]="slidez.image" style="margin:auto;">
        <div class="carousel-caption">
          <h3 style="background-color: transparent;color: white;">Slide {{i + 1}}</h3>
          <p style="background-color: transparent;color: white;">{{slidez.text}}</p>
        </div>
      </slide>
    </carousel>


*/