import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { Observable } from 'rxjs/Observable';
import { PropertyFacet } from '../../shared/dtos/facets';
import { FacetsService } from '../../shared/services/facets.service';
import { jQueryService } from '../../shared/services/jquery.service';

@Component({
  selector: 'property-slider',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html'
})
export class PropertySlider implements AfterViewInit {
  @Input() facet: PropertyFacet;
  @Output() applyFacet: EventEmitter<any> = new EventEmitter();
  public absoluteMin: number;
  public absoluteMax: number;

  constructor(private facetsService: FacetsService, private jquery: jQueryService) { }

  ngAfterViewInit() {
    this.facetsService.minPrice$.subscribe(i => this.updateSlider({ start: i }));
    this.facetsService.maxPrice$.subscribe(i => this.updateSlider({ end: i }));

    this.jquery.loadFoundation()
      .flatMap(() => new Observable(observer => this.jquery.jquery('body').on('changed.zf.slider', () => observer.next(null))))
      .map(() => this.jquery.jquery('.slider .slider-handle').eq(0))
      .filter(smallHandle => smallHandle.attr('aria-valuemin') !== '0' || smallHandle.attr('aria-valuemax') !== '100')
      .do(() => {
        this.facet.min_price = Number(this.jquery.jquery('input#sliderOutput1').val());
        this.facet.max_price = Number(this.jquery.jquery('input#sliderOutput2').val());
        this.applyFacet.emit(this.facet);
        console.log('emit facet1', this.facet.min_price, this.facet.max_price);
      })
      .subscribe();
  }

  private updateSlider(options: { start?: number, end?: number }) {
    this.absoluteMax = options.end ? options.end : this.absoluteMax;
    this.absoluteMin = options.start ? options.start : this.absoluteMin;

    if (!this.absoluteMin || !this.absoluteMax || this.absoluteMin === -1 || this.absoluteMax === -1) {
      return;
    }

    const initialStart = this.absoluteMin > 450 ? this.absoluteMin : 450;
    const initialEnd = this.absoluteMax < 950 ? this.absoluteMax : 950;

    this.setSlider({
      start: Number(this.absoluteMin),
      end: Number(this.absoluteMax),
      initialStart: Number(initialStart),
      initialEnd: Number(initialEnd),
    });

    this.facet.min_price = initialStart;
    this.facet.max_price = initialEnd;
    this.applyFacet.emit(this.facet);

    console.log('emit facet2', this.facet.min_price, this.facet.max_price, this.absoluteMin, this.absoluteMax);
  }

  private setSlider(sliderOptions: { start: number, end: number, initialStart: number, initialEnd: number }) {
    this.jquery.loadFoundation().subscribe(foundation => {
      setTimeout(() => {
        const slider = this.jquery.jquery('.slider');

        if (slider.length) {
          // Apologies, this be shitty. No, this is not a merge conflict.
          new foundation.Slider(slider, sliderOptions)
          new foundation.Slider(slider, sliderOptions)
        }
      }, 2500);
    });
  }
}
