import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Property } from '../../properties/property';
import { PropertyService } from '../../shared/services/property.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'dashboard',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class Dashboard {
  public properties$: Observable<Property[]>;
  public showUnverifiedAd: boolean = false;
  public showPicturesAd: boolean = true;

  constructor(private propertyService: PropertyService, private userService: UserService) { }

  public updateProperty(property: Property) {
    this.propertyService.update(property).subscribe();
  }

  ngOnInit() {
    this.properties$ = this.propertyService
      .getMyProperties$();

    this.userService.loadMe()
      .subscribe(i => {
        this.showUnverifiedAd = !Boolean(i.verified_at);
        this.showPicturesAd = !this.showUnverifiedAd;
      });
  }
}
