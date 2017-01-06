import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Property } from '../../shared/dtos/property';
import { PropertyService } from '../../shared/services/property.service';
import { UserService, Me } from '../../shared/services/user.service';

@Component({
  selector: 'landlord-dashboard',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html'
})
export class LandlordDashboard {
  public properties$: Observable<Property[]>;
  public showUnverifiedAd: boolean = false;
  public showPicturesAd: boolean = true;

  constructor(private propertyService: PropertyService, private userService: UserService, private router: Router) { }

  public updateProperty(property: Property) {
    this.propertyService.update(property).subscribe();
  }

  ngOnInit() {
    this.properties$ = this.propertyService
      .getMyProperties$();

    this.userService.loadMe()
      .subscribe((i: Me) => {
        this.showUnverifiedAd = !Boolean(i.is_verified);
        this.showPicturesAd = !this.showUnverifiedAd;
      });
  }
}
