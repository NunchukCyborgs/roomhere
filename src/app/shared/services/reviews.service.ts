import { Renderer, Inject, Injectable } from "@angular/core";
import { HttpService } from './http.service';

import { Observable } from 'rxjs/Observable';

import { Property, Review } from '../../properties/property';

@Injectable()
export class ReviewsService {
  constructor(private http: HttpService) { }

  public addReview(review: Review): Observable<Review> {
    return this.http.post(`${BASE_API_URL}/properties/reviews`, review)
      .map(i => i.json());
  }

  public updateReview(review: Review): Observable<Review> {
    return this.http.patch(`${BASE_API_URL}/properties/reviews/${review.id}`, review)
      .map(i => i.json());
  }
}
