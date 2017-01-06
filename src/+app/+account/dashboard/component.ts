import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService, Me } from '../../shared/services/user.service';

@Component({
  selector: 'dashboard',
  styleUrls: [],
  template: '<user-dashboard *ngIf="!(isLandlord$ | async)"></user-dashboard><landlord-dashboard *ngIf="isLandlord$ | async"></landlord-dashboard>'
})
export class Dashboard {
  public isLandlord$: Observable<boolean>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.isLandlord$ = this.userService.loadMe()
      .map(i => i.licenses || [])
      .map(i => Boolean(i.length));
  }
}
