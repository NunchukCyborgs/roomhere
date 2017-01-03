import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { isBrowser } from 'angular2-universal';
import { Observable } from 'rxjs/Observable';
import { HttpService, HttpOptions } from './http.service';
import { UserService } from './user.service';
import { PropertyService } from './property.service';
import { PersistenceService } from './persistence.service';
import { generateGUID } from './util';
import { PaymentRequest, PaymentRequestBlob } from '../dtos/payment-request';

@Injectable()
export class AnalyticsService {
  constructor(private router: Router, private http: HttpService, private userService: UserService, private propertyService: PropertyService,
    private persist: PersistenceService) {
    const id = this.persist.get('id');
    if (!id) {
      this.persist.set('id', generateGUID());
    }
  }

  private keenUrl = 'https://api.keen.io/3.0/projects/57ebfd808db53dfda8a711fb/events/';
  private apiKey = '288a891ccc97fce4acf80fddedeab4821adf6f57dd248b629700d7960cedca268e71acbd96b634a434dbf219ce58b029a5fd5dfff6e60acb08c7e1e8441685152ad79af98d65daf0a552bd1a67e2dba828f0f9fa747e01213bd3335a9aa6bc49';

  public recordAction(actionName: string, options: any = {}): void {
    if (IS_PROD && isBrowser) {
      this.http.post(`${this.keenUrl}${actionName}?api_key=${this.apiKey}`, Object.assign(options, this.getBaseOptions()), { onlyBaseHeaders: true })
        .subscribe();
    }
  }

  private getBaseOptions(): any {
    return {
      id: this.persist.get('id'),
      uid: this.persist.get('uid'),
      url: this.router.url,
    };
  }
}
