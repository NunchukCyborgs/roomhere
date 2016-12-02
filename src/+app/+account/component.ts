import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'account-page',
  templateUrl: 'template.html' 
})
export class AccountPage {
  public hasAuth$: Observable<boolean>;
  public superuser$: Observable<boolean>;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.hasAuth$ = this.userService.hasAuth$;
    this.superuser$ = this.userService.me$.map(i => i.superuser);
    this.userService.loadMe().subscribe();    
  }
}
