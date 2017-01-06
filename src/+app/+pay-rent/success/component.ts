import { Component } from '@angular/core';
import { AnalyticsService } from '../../shared/services/analytics.service';

@Component({
  selector: 'pay-rent-success',
  styleUrls: [],
  templateUrl: 'template.html'
})
export class PayRentSuccess {
  constructor(private analytics: AnalyticsService) { }
  public gotoDashboard() {
    this.analytics.recordAction('Pay Rent | Click Dashboard Link from Succes Page');
  }
}
