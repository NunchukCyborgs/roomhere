import { Component, Input } from '@angular/core';
import { Property, Review } from '../property';
import { ReviewsService } from '../../shared/services/reviews.service';

@Component({
  selector: 'property-reviews',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString(),
})
export class PropertyReviews {
  @Input() property: Property;
  public myReview: Review;
  public otherReviews: Review[];
  public isEditing: boolean = false;

  constructor(private reviewsService: ReviewsService) { }

  ngOnChanges() {
    this.myReview = this.property.reviews.find(i => i.is_owned) || new Review();
    this.otherReviews = this.property.reviews.filter(i => !i.is_owned);

    // temp
    const fakeReview = new Review();
    fakeReview.title = 'super title review';
    fakeReview.landlord_rating = 3;
    fakeReview.property_rating = 3;
    fakeReview.body = 'some text document.txt. some text document.txt. some text document.txt. some text document.txt. some text document.txt. some text document.txtsome text document.txtsome text document.txtsome text document.txt';
    this.otherReviews.push(fakeReview, fakeReview, fakeReview)
  }

  public submitReview() {
    const stream = this.myReview.id ? this.reviewsService.updateReview(this.myReview) : this.reviewsService.addReview(this.myReview);
    stream.subscribe(() => this.isEditing = false);
  }
}
