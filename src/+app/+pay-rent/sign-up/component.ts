import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../shared/dtos/user';
import { UserService } from '../../shared/services/user.service';
import { ValidationService } from '../../shared/services/validation.service';
import { isBrowser } from 'angular2-universal';
import { ControlMessages } from '../../shared/components/control-messages/component';

@Component({
  selector: 'pay-rent-sign-up',
  styleUrls: [],
  templateUrl: 'template.html',
})
export class PayRentSignUp {
  public token: { token: string };
  public signupForm: FormGroup;
  public serverErrors: string[] = [];
  public success: boolean = false;
  public redirectUrl: string = '/p/payment-success';

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.params
      .map(i => i['token'])
      .do(i => this.token = { token: i })
      .subscribe();
  }
}
