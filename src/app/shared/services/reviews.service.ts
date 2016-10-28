import { Renderer, Inject, Injectable } from "@angular/core";

import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import { Property, Review } from '../../properties/property';

@Injectable()
export class ReviewsService {
  constructor(private http: HttpService) { }

  public addReview(review: Review, propertyId: number): Observable<Review> {
    return this.http.post(`${BASE_API_URL}/reviews`, Object.assign({}, review, {property_id: propertyId}))
      .map(i => i.json());
  }

  public updateReview(review: Review): Observable<Review> {
    return this.http.patch(`${BASE_API_URL}/reviews/${review.id}`, review)
      .map(i => i.json());
  }
}
