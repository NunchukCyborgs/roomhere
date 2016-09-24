import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Amenity } from '../../services/facets.service';

@Component({
  selector: 'property-amenities',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString(),
})
export class PropertyAmenities {
  @Input() isEditing: boolean;
  @Input() amenities: Amenity[];
  @Output() amenitiesChange: EventEmitter<any> = new EventEmitter();

  public prettyAmenities: Amenity[];

  ngOnChanges() {
    this.prettyAmenities = this
      .sortAmenities(this.amenities)
      .map(i => this.shortenAmenities(i));
  }

  public update(amen: Amenity, $event: any) {
    amen.active = $event.target.checked;
    this.amenities[this.amenities.map(i => i.id).indexOf(amen.id)] = amen;
    this.amenitiesChange.emit(this.amenities);
  }

  public hasAnyAmenities(): boolean {
    return this.prettyAmenities.filter(i => i.active).length > 0;
  }

  private sortAmenities(amens: Amenity[]): Amenity[] {
    return amens.sort((a, b) => a.name.length < b.name.length ? -1 : 1);
  }

  private shortenAmenities(amen: Amenity): Amenity {
    amen.name = amen.name.replace(' Included', ' Incl.').replace(' Allowed', '');
    return amen;
  }
}
