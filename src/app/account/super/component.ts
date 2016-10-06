import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Property } from '../../properties/property';
import { PropertyService } from '../../properties/property.service';
import { UserService } from '../../users/user.service';

@Component({
  selector: 'super-user',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class SuperUser {
  public properties$: Observable<Property[]>;
  public pageNumber: number = 1;
  public perPage: number = 100;
  public query: string = '';

  constructor(private propertyService: PropertyService, private userService: UserService) {

  }

  public updateProperty(property: Property) {
    this.propertyService.update(property).subscribe();
  }

  ngOnInit() {
    this.loadProperties();
  }

  public nextPage(increment: string) {
    this.pageNumber += Number(increment);
    this.loadProperties();
  }

  public loadProperties() {
    this.properties$ = this.propertyService
      .getSuperProperties$(this.pageNumber, this.perPage, this.query);
  }
}
