import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertyFacet } from '../properties/index';

declare let $: any;

@Component({
  moduleId: __filename,
  selector: 'property-slider',
  styles: [`
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

  ngAfterViewInit() {
    if ($) {
      $(document).foundation();

      $('body').on("changed.zf.slider", () => {
        this.facet.min_price = Number($('input#sliderOutput1').val());
        this.facet.max_price = Number($('input#sliderOutput2').val());
        this.applyFacet.emit(this.facet);
      });
    }
  }
}
