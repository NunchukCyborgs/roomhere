import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertyFacet } from '../properties/index';
import { ServerUnsafeService } from '../services/server-unsafe.service';
import { FacetsService } from '../services/facets.service';

declare let $: any;
declare let Foundation: any;

@Component({
  moduleId: __filename,
  selector: 'property-slider',
  styles: [`
    input {
      min-width: 60px;
    }
  `],
  template: `
    <div class="large-2 medium-2 small-3 columns">
        <input type="number" id="sliderOutput1">
    </div>
    <div class="large-8 medium-8 small-6 columns">
      <div class="slider round" data-slider data-initial-start="0" data-initial-end="10000" data-options="start: 0; end: 2500;">
        <span class="slider-handle js-min-price-facet" data-slider-handle role="slider"  tabindex="1" aria-controls="sliderOutput1"></span>
        <span class="slider-fill" data-slider-fill></span>
        <span class="slider-handle js-max-price-facet" data-slider-handle role="slider" tabindex="1" aria-controls="sliderOutput2"></span>
      </div>
    </div>
    <div class="large-2 medium-2 small-3 columns">
        <input type="number" id="sliderOutput2">
    </div>
  `
})
export class PropertySlider implements AfterViewInit {
  @Input() facet: PropertyFacet;
  @Output() applyFacet: EventEmitter<any> = new EventEmitter();
  private minPrice: number;
  private maxPrice: number;

  constructor(private unsafe: ServerUnsafeService, private facetsService: FacetsService) { }

  ngAfterViewInit() {
    this.facetsService.minPrice$.subscribe(i => this.updateSlider({ start: i }));
    this.facetsService.maxPrice$.subscribe(i => this.updateSlider({ end: i }));

    this.unsafe.tryUnsafeCode(() => {
      $('body').on("changed.zf.slider", () => {
        this.facet.min_price = Number($('input#sliderOutput1').val());
        this.facet.max_price = Number($('input#sliderOutput2').val());
        this.applyFacet.emit(this.facet);
      });
    }, '$ is undefined');
  }

  private updateSlider(options: { start?: number, end?: number }) {
    this.maxPrice = options.end ? options.end : this.maxPrice;
    this.minPrice = options.start ? options.start : this.minPrice;
    
    if (this.minPrice && this.maxPrice) {
      this.facet.min_price = this.minPrice;
      this.facet.max_price = this.maxPrice;
      this.applyFacet.emit(this.facet);
      this.unsafe.tryUnsafeCode(() => new Foundation.Slider($('.slider'), { start: this.minPrice, end: this.maxPrice }), 'Foundation undefined');
    }
  }
}
