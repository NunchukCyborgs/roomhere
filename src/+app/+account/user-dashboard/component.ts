import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PaymentService } from '../../shared/services/payment.service';
import { ReviewsService } from '../../shared/services/reviews.service';
import { PersistenceService } from '../../shared/services/persistence.service';
import { PaymentRequest } from '../../shared/dtos/payment-request';
import { Review, Property } from '../../shared/dtos/property';

@Component({
  selector: 'user-dashboard',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html'
})
export class UserDashboard {
  public payments$: Observable<PaymentRequest[]>;
  public reviews$: Observable<Review[]>;
  public property: Property;
  public username: string;

  constructor(private router: Router, private paymentService: PaymentService, private reviewsService: ReviewsService, private persist: PersistenceService) { }

  ngOnInit() {
    this.payments$ = this.paymentService.getMyPayments();
    // this.reviews$ = this.reviewsService.getMyReviews();
    this.username = this.persist.get('uid')
  }

  public updatePaymentRequests(): void {
    this.payments$ = this.paymentService.getMyPayments({ skipCache: true });
    this.payments$.subscribe();
  }

  public deletePaymentRequest(paymentRequest: PaymentRequest): void {
    this.paymentService.deletePaymentRequest(paymentRequest.token)
      .do(() => this.updatePaymentRequests())
      .subscribe();
  }

  public navigateToProperty(): void {
    this.router.navigate([`/${DEFAULT_TENANT}/${this.property.slug}`]);
  }
}
