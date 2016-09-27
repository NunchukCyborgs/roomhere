import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Property } from '../properties/property';
import { PropertyService } from '../properties/property.service';
import { UserService } from '../users/user.service';

@Component({
  selector: 'dashboard',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class Dashboard {
  public properties$: Observable<Property[]>;
  public showLicenseIdAd: boolean = false;
  public showPicturesAd: boolean = true;

  constructor(private propertyService: PropertyService, private userService: UserService) {

  }

  public updateProperty(property: Property) {
    this.propertyService.update(property).subscribe();
  }

  ngOnInit() {
    this.properties$ = this.propertyService
      .getMyProperties$();

    this.userService.loadLicenseId()
      .subscribe(i => {
        const hasLicenseId = Boolean(i);
        this.showLicenseIdAd = !hasLicenseId;
        this.showPicturesAd = !this.showLicenseIdAd;
      });
  }
}
