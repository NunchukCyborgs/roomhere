import { Renderer, Inject, Injectable } from "@angular/core";

import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import { Property, Review } from '../../shared/dtos/property';
import { PropertyService } from './property.service';

@Injectable()
export class ReviewsService {
  constructor(private http: HttpService, private propertyService: PropertyService) { }

  public addReview(review: Review, propertyId: number): Observable<Review> {
    return this.http.post(`${BASE_API_URL}/reviews`, { review: Object.assign({}, review, { property_id: propertyId }) })
      .map(i => new Review(i.json()))
      .do(i => this.updateProperty(i));
  }

  public updateReview(review: Review): Observable<Review> {
    return this.http.patch(`${BASE_API_URL}/reviews/${review.id}`, { review: review })
      .map(i => new Review(i.json()))
      .do(i => this.updateProperty(i));
  }

  private updateProperty(review: Review) {
    return this.propertyService.propertyBySlug$
      .take(1)
      .map(i => Object.assign(i, { reviews: this.getCombinedReviews(review, i.reviews) }))
      .flatMap(i => this.propertyService.updatePropertyBySlugLocal(i))
      .subscribe();
  }

  private getCombinedReviews(myReview: Review, reviews: Review[]): Review[] {
    const otherReviews = reviews.filter(i => i.id && !i.is_owned);
    return [...otherReviews, myReview];
  }
}
