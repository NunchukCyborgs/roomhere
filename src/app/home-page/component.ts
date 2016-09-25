import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../users/user.service';

@Component({
  selector: 'home-page',
  template: require('./template.html').toString() 
})
export class HomePage {
  public hasAuth$: Observable<boolean>;
  constructor(private userService: UserService) {
    this.hasAuth$ = this.userService.hasAuth$;
  }
}