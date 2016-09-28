import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../users/user.service';

@Component({
  selector: 'home-page',
  template: require('./template.html').toString() 
})
export class HomePage {
  public hasAuth$: Observable<boolean>;
  public superuser$: Observable<boolean>;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.hasAuth$ = this.userService.hasAuth$;
    this.superuser$ = this.userService.me$.map(i => i.superuser);
    this.userService.loadMe().subscribe();    
  }
}
