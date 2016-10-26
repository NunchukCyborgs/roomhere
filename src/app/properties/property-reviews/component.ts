import { Component, Input } from '@angular/core';
import { Property, Review } from '../property';

@Component({
  selector: 'property-reviews',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString(),
})
export class PropertyReviews {
  @Input() property: Property;

  public review: Review = new Review();
  ngOnInIt() {
	const fakeReview = new Review();
	fakeReview.title = 'super title review'
	// fill out other properties
  fakeReview.landlord_rating = 3
  fakeReview.property_rating = 3
  fakeReview.body = 'some text document.txt'
	this.property.reviews = [
		fakeReview, fakeReview, fakeReview
	]
}
}
