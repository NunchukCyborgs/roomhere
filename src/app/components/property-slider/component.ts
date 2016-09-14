import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertyFacet } from '../../properties/index';
import { ServerUnsafeService } from '../../services/server-unsafe.service';
import { FacetsService } from '../../services/facets.service';

@Component({
  selector: 'property-slider',
  // styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html'
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
