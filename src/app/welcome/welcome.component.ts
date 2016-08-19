import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PropertyService, Property } from '../properties/property.service';
import { PropertyPreview } from '../properties/property-preview.component';
import { PropertyMap } from './property-map.component'

@Component({
  moduleId: __filename,
  selector: 'welcome',
  directives: [PropertyPreview, PropertyMap],
  styles: [`
  `],
  templateUrl: 'welcome.component.html'
})
export class Welcome {
  public properties$: Observable<Property[]>;
  constructor(private propertyService: PropertyService) { ; }

  ngOnInit() {
    this.properties$ = this.propertyService.collection$
  }
}
