import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { isBrowser } from 'angular2-universal';
import { Owner } from '../../shared/dtos/property';

@Component({
  selector: 'rent-now',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html'
})
export class RentNow {
  @Input() owner: Owner;

  private closeModal(res?: Response) {
    if (!res || res.ok) {
      isBrowser && $('modal .close-button').click();
    }
  }
}
