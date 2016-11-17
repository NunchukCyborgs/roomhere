import { Component, Input } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { ReviewsService } from '../../shared/services/reviews.service';
import { UserService } from '../../shared/services/user.service';
import { Property, Review } from '../../shared/dtos/property';

@Component({
  selector: 'property-reviews',
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html',
})
export class PropertyReviews {
  @Input() property: Property;
  @Input() reviews: Review[];
  public myReview: Review;
  public otherReviews: Review[];
  public isEditing: boolean = false;
  public showError: boolean = false;

  constructor(private reviewsService: ReviewsService, private userService: UserService) { }

  ngOnChanges(changes: any) {
    this.myReview = this.reviews.find(i => i.is_owned) || new Review();
    this.otherReviews = this.reviews.filter(i => !i.is_owned);
  }

  public save(review: Review) {
    const stream = review.id ? this.reviewsService.updateReview(review) : this.reviewsService.addReview(review, this.property.id);
    stream
      .do(i => this.showError = !i.id)
      .filter(i => Boolean(i.id))
      .subscribe(() => this.isEditing = false);
  }

  public editReview() {
    this.userService.hasAuth$
      .do(i => this.isEditing = i)
      .filter(i => !i && isBrowser)
      .subscribe(i => $('#SignupLink').click());
  }
}
