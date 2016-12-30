import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { isBrowser } from 'angular2-universal';
import { Owner } from '../../shared/dtos/property';
import { jQueryService } from '../../shared/services/jquery.service';

@Component({
  selector: 'rent-now',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html'
})
export class RentNow {
  @Input() owner: Owner;

  constructor(private jquery: jQueryService) { }

  private closeModal(res?: Response) {
    this.jquery.loadJQuery()
      .filter(() => !res || res.ok)
      .subscribe(jquery => jquery('modal .close-button').click());
  }
}
