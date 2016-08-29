import { Component, Input, Output, EventEmitter } from '@angular/core';
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
      <div [class.hide]="showMore || isEditing" *ngFor="let amen of featuredAmenities" class="column small-6">
        <span><i class="large {{amen.icon}}"></i> {{amen.name}}</span>
      </div>

      <div class="column small-12 medium-6" [class.hide]="showMore"><a (click)="showMore = true">more +</a></div>

      <div [class.hide]="!showMore && !isEditing" *ngFor="let amen of amenities" class="column small-6">
        <span *ngIf="!isEditing" [class.strike]="!amen.active" ><i *ngIf="amen.active" class="large {{amen.icon}}"></i> {{amen.name}}</span>
        <span *ngIf="isEditing">
          <input type="checkbox" [checked]="amen.active" (change)="update(amen, $event)" />
        {{amen.name}}</span>
      </div>
    </div>
  `
})
export class PropertyAmenities {
  @Input() isEditing: boolean;
  @Input() amenities: Amenity[];
  @Output() amenitiesChange: EventEmitter<any> = new EventEmitter();
  public featuredAmenities: Amenity[];
  public showMore: boolean;

  ngOnInit() {
    this.featuredAmenities = this.amenities
      .filter(i => i.active)
      .slice(1, 4);

    this.showMore = this.featuredAmenities.length === 0;
  }

  public update(amen: Amenity, $event: any) {
    amen.active = $event.target.value === 'on';
  }
}
