import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Property } from '../properties/property';
import { PropertyService } from '../properties/property.service';
import { UserService } from '../users/user.service';

@Component({
  selector: 'super-user',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class SuperUser {
  public properties$: Observable<Property[]>;

  constructor(private propertyService: PropertyService, private userService: UserService) {

  }

  public updateProperty(property: Property) {
    this.propertyService.update(property).subscribe();
  }

  ngOnInit() {
    this.properties$ = this.propertyService
      .getSuperProperties$();
  }
}
