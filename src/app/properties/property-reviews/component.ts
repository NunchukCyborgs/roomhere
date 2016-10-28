import { Component, Input } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { ReviewsService } from '../../shared/services/reviews.service';
import { UserService } from '../../shared/services/user.service';
import { Property, Review } from '../../shared/dtos/property';

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
  public showError: boolean = false;

  constructor(private reviewsService: ReviewsService, private userService: UserService) { }

  ngOnChanges() {
    this.myReview = this.property.reviews.find(i => i.is_owned) || new Review();
    this.otherReviews = this.property.reviews.filter(i => !i.is_owned);

    // temp
    const fakeReview = new Review();
    fakeReview.title = 'super title review';
    fakeReview.landlord_body = 'The landlord seems alright. But you know, could be better yo.'
    fakeReview.landlord_rating = 3;
    fakeReview.property_rating = 4;
    fakeReview.duration = 3;
    fakeReview.is_anonymous = false;
    fakeReview.id = 2;
    fakeReview.is_owned = false;
    fakeReview.body = 'some text document.txt. some text document.txt. some text document.txt. some text document.txt. some text document.txt. some text document.txtsome text document.txtsome text document.txtsome text document.txt';
    // this.otherReviews.push(fakeReview, new Review(Object.assign({}, fakeReview, { property_rating: 3.5 })), new Review(fakeReview))
  }

  public save() {
    const stream = this.myReview.id ? this.reviewsService.updateReview(this.myReview) : this.reviewsService.addReview(this.myReview, this.property.id);
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
