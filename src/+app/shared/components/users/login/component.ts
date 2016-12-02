import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../dtos/user';
import { UserService } from '../../../services/user.service';
import { isBrowser } from 'angular2-universal';
import { ValidationService } from '../../../services/validation.service';
import { ControlMessages } from '../../control-messages/component';

@Component({
  selector: 'login',
  styleUrls: [],
  templateUrl: 'template.html'
})
export class Login {
  public serverErrors: string[] = [];
  public loginForm: any;

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.init();
    isBrowser && $(document).on('closed.zf.reveal', () => this.init());
  }

  private init() {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'password': ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public onSubmit() {
    const user = new User({
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    });

    this.userService.login(user)
      .do((res: Response) => this.serverErrors = ValidationService.getAuthErrors(res))
      .filter((res: Response) => !res || res.ok)
      .do((res: Response) => this.closeModal(res))
      .subscribe(() => this.redirectUser());
  }

  public closeModal(res?: Response) {
    isBrowser && $('modal .close-button').click();
  }

  private redirectUser() {
    this.userService.loadMe()
      .filter(i => Boolean(i.licenses && i.licenses.length))
      .subscribe(() => this.router.navigate(['/account/dashboard']))
  }
}
