import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { isBrowser } from 'angular2-universal';
import { Owner } from '../property';

@Component({
  selector: 'rent-now',
  styles:[require('../../users/modal/modal.component.scss').toString(), require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class RentNow {
  @Input() owner: Owner;

  private closeModal(res?: Response) {
    if (!res || res.ok) {
      isBrowser && $('rent-now .close-button').click();
    }
  }
}
