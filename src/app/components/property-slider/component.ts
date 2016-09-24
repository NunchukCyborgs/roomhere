import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertyFacet } from '../../properties/property';
import { isBrowser } from 'angular2-universal';
import { FacetsService } from '../../services/facets.service';

@Component({
  selector: 'property-slider',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class PropertySlider implements AfterViewInit {
  @Input() facet: PropertyFacet;
  @Output() applyFacet: EventEmitter<any> = new EventEmitter();
  private minPrice: number;
  private maxPrice: number;

  constructor(private facetsService: FacetsService) { }

  ngAfterViewInit() {
    this.facetsService.minPrice$.subscribe(i => this.updateSlider({ start: i }));
    this.facetsService.maxPrice$.subscribe(i => this.updateSlider({ end: i }));

    if (isBrowser) {
      $('body').on("changed.zf.slider", () => {
        this.facet.min_price = Number($('input#sliderOutput1').val());
        this.facet.max_price = Number($('input#sliderOutput2').val());
        this.applyFacet.emit(this.facet);
      });
    }
  }

  private updateSlider(options: { start?: number, end?: number }) {
    this.maxPrice = options.end ? options.end : this.maxPrice;
    this.minPrice = options.start ? options.start : this.minPrice;
    
    if (this.minPrice && this.maxPrice) {
      this.facet.min_price = this.minPrice;
      this.facet.max_price = this.maxPrice;
      this.applyFacet.emit(this.facet);
      isBrowser && new Foundation.Slider($('.slider'), { start: this.minPrice, end: this.maxPrice });
    }
  }
}
