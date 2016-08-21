import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { PropertyService, Property } from './property.service';

@Component({
  moduleId: __filename,
  selector: 'property-view',
  styles: [`

  `],
  template: `
    <h1>This is the {{(property$ | async)?.address1}} property!</h1>
  `
})
export class PropertyView implements OnDestroy {
  public property$: Observable<Property>;
  private sub: Subscription;
  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private propertyService: PropertyService
    ) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let slug = params['slug'];
      this.property$ = this.propertyService.getPropertyBySlug$(slug);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
