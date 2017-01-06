import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Property } from '../../../shared/dtos/property';
import { PropertyService } from '../../../shared/services/property.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'super-user-property-management',
  styleUrls: [],
  templateUrl: 'template.html'
})
export class SuperPropertyManagement {
  public properties$: Observable<Property[]>;
  public pageNumber: any = 1;
  public perPage: any = 100;
  public query: string = '';

  constructor(private propertyService: PropertyService, private userService: UserService) { }

  public updateProperty(property: Property) {
    this.propertyService.update(property).subscribe();
  }

  ngOnInit() {
    this.loadProperties();
  }

  public nextPage(increment) {
    this.pageNumber += Number(increment);
    this.loadProperties();
  }

  public loadProperties() {
    this.properties$ = this.propertyService
      .getSuperProperties$(this.pageNumber, this.perPage, this.query);
  }
}
