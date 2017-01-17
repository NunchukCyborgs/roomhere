import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { Observable } from 'rxjs/Observable';
import { PropertyFacet } from '../../shared/dtos/facets';
import { FacetsService } from '../../shared/services/facets.service';

@Component({
  selector: 'property-slider',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html'
})
export class PropertySlider {
  @Input() facet: PropertyFacet;
  @Output() applyFacet: EventEmitter<any> = new EventEmitter();
  public options: { absoluteMin?: number, absoluteMax?: number, selectedMin?: number, selectedMax?: number };
  public isBrowser = isBrowser;

  constructor(private facetsService: FacetsService) { }

  ngOnInit() {
    this.options = {
      selectedMin: this.facet.min_price || 450,
      selectedMax: this.facet.max_price || 450,
      absoluteMax: 1000, // Take these out?
      absoluteMin: 0, // Take these out?
    };

    Observable.combineLatest(this.facetsService.minPrice$, this.facetsService.maxPrice$)
      .filter(i => typeof i[0] === 'number' && typeof i[1] === 'number')
      .do(i => this.options.absoluteMin = i[0])
      .do(i => this.options.absoluteMax = i[1])
      .subscribe();
  }

  public submit(): void {
    this.facet.min_price = this.options.selectedMin;
    this.facet.max_price = this.options.selectedMax;
    this.applyFacet.emit(this.facet);
  }

  // ngAfterViewInit() {
  //   this.facetsService.minPrice$.subscribe(i => this.updateSlider({ start: i }));
  //   this.facetsService.maxPrice$.subscribe(i => this.updateSlider({ end: i }));

  //   this.jquery.loadFoundation()
  //     .subscribe(() => {
  //       this.jquery.jquery('body').on('changed.zf.slider', () => {
  //         this.facet.min_price = Number(this.jquery.jquery('input#sliderOutput1').val());
  //         this.facet.max_price = Number(this.jquery.jquery('input#sliderOutput2').val());
  //         this.applyFacet.emit(this.facet);
  //       });
  //     });
  // }

  // private updateSlider(options: { start?: number, end?: number }) {
  //   this.maxPrice = options.end ? options.end : this.maxPrice;
  //   this.minPrice = options.start ? options.start : this.minPrice;

  //   const initialStart = this.minPrice > 450 ? this.minPrice : 450;
  //   const initialEnd = this.maxPrice < 950 ? this.maxPrice : 950;

  //   if (this.minPrice && this.maxPrice) {
  //     this.facet.min_price = this.minPrice;
  //     this.facet.max_price = this.maxPrice;
  //     this.applyFacet.emit(this.facet);

  //     const options = {
  //       start: Number(this.minPrice),
  //       end: Number(this.maxPrice),
  //       initialStart: Number(initialStart),
  //       initialEnd: Number(initialEnd),
  //     }


  // }
  // }
}
