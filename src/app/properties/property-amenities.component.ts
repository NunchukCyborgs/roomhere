import { Component, Input } from '@angular/core';
import { Amenity } from './index';

@Component({
  moduleId: __filename,
  selector: 'property-amenities',
  styles: [`
    .strike {
      text-decoration: line-through;
    }
  `],
  template: `
    <div class="row">
      <div [hidden]="showMore" *ngFor="let amen of featuredAmenities" class="column small-6">
        <span><i class="large {{amen.icon}}"></i> {{amen?.name}}</span>
      </div>

      <div class="column small-6" [hidden]="showMore"><a (click)="showMore = true">more +</a></div>

      <div [hidden]="!showMore" *ngFor="let amen of amenities" class="column small-6">
        <span [class.strike]="!amen?.active" ><i class="large {{amen.icon}}"></i> {{amen?.name}}</span>
      </div>
    </div>
  `
})
export class PropertyAmenities {
  @Input() amenities: Amenity[];
  public featuredAmenities: Amenity[];
  public showMore: boolean;

  ngOnInit() {
    this.featuredAmenities = this.amenities
      .filter(i => i.active)
      .slice(1, 4);

    this.showMore = this.featuredAmenities.length === 0;
  }
}
