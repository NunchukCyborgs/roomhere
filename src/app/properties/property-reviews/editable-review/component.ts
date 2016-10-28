import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../../../shared/services/validation.service';
import { Property, Review } from '../../property';

@Component({
  selector: 'editable-review',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString(),
})
export class EditableReview {
  @Input() review: Review;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  public reviewForm: FormGroup;
  public landlordRating: number;
  public propertyRating: number;

  constructor(private formBuilder: FormBuilder, private validationService: ValidationService) { }

  ngOnInit() {
    this.landlordRating = this.review.landlord_rating;
    this.propertyRating = this.review.property_rating;
    this.reviewForm = this.formBuilder.group({
      'title': new FormControl(this.review.title, [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
      'body': new FormControl(this.review.body, [Validators.required, Validators.minLength(30), Validators.maxLength(175)]),
      'landlordBody': new FormControl(this.review.landlord_body, [Validators.required, Validators.minLength(30), Validators.maxLength(175)]),
      'duration': new FormControl(this.review.duration, [Validators.required]),
      'isAnonymous': new FormControl(this.review.is_anonymous),
      'isCurrentTenant': new FormControl(this.review.is_current_tenant),
      'landlordRating': new FormControl(),
      'propertyRating': new FormControl(),
    });
  }

  public onSave() {
    const review: Review = new Review({
      title: this.reviewForm.controls['title'].value,
      body: this.reviewForm.controls['body'].value,
      landlord_body: this.reviewForm.controls['landlordBody'].value,
      duration: this.reviewForm.controls['duration'].value,
      is_anonymous: this.reviewForm.controls['isAnonymous'].value,
      is_current_tenant: this.reviewForm.controls['isCurrentTenant'].value,
      landlord_rating: this.landlordRating,
      property_rating: this.propertyRating,
    });

    this.save.emit(review);
  }

  private getRatingError(rating: number): string {
    return this.reviewForm.valid && this.reviewForm.touched && !rating ? 'Please give an overall rating. ' : '';
  }
}
