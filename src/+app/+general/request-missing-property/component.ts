import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { PropertyService } from '../../shared/services/property.service';
import { ValidationService } from '../../shared/services/validation.service';

@Component({
  selector: 'request-missing-property',
  styleUrls: ['styles.css'],
  templateUrl: 'template.html'
})
export class RequestMissingProperty {
  public missingPropertyForm: FormGroup;
  public success: boolean;

  constructor(private router: Router, private propertyService: PropertyService) { }

  ngOnInit() {
    this.missingPropertyForm = new FormGroup({
      email: new FormControl('', [Validators.required, ValidationService.emailValidator]),
      address: new FormControl('', [Validators.required]),
    });
  }

  public submit() {
    let email = this.missingPropertyForm.controls['email'].value;
    let address = this.missingPropertyForm.controls['address'].value;
    this.propertyService.requestMissingProperty(email, address)
      .do((i: Response) => this.success = i.ok)
      .subscribe();
  }
}
