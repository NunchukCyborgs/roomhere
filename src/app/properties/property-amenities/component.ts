import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Amenity } from '../index';

declare let require: (string) => string;

@Component({
  moduleId: __filename,
  selector: 'property-amenities',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html',
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
    amen.active = $event.target.checked;
    this.amenities[this.amenities.map(i => i.id).indexOf(amen.id)] = amen;
    this.amenitiesChange.emit(this.amenities);
  }
}
