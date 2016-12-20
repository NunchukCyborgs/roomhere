import { Component, OnDestroy, Renderer } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { isBrowser } from 'angular2-universal';

import { MapOptions } from '../+property/property-map/component';
import { UserService } from '../shared/services/user.service';
import { PropertySeoService } from '../shared/services/property-seo.service';
import { SocialService } from '../shared/services/social.service';
import { Property } from '../shared/dtos/property';
import { PropertyActionState, PropertyActionMode } from '../shared/services/property-action-state.service';
import { HttpService } from '../shared/services/http.service';
import { ImageUploadService, PendingFile } from '../shared/services/image-upload.service';
import { PropertyService } from '../shared/services/property.service';
import { PropertyActionStateService } from '../shared/services/property-action-state.service';
import { getHoneybadger } from '../shared/services/honeybadger';
import { AnalyticsService } from '../shared/services/analytics.service';

const ZOOM_LEVEL: number = 16;
const HEIGHT: string = '350px';

@Component({
  selector: 'property-view',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html'
})
export class PropertyView {
  public property: Property = new Property();
  public mapOptions: MapOptions;
  public isEditing$: Observable<boolean>;
  public actionState$: Observable<PropertyActionState>;
  public tweetText: string;
  public hasAuth$: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private userService: UserService,
    private propertySeoService: PropertySeoService,
    private renderer: Renderer,
    private socialService: SocialService,
    private http: HttpService,
    private actionStateService: PropertyActionStateService,
    private analyticsService: AnalyticsService,
  ) { }

  public shareFacebook() {
    this.socialService.hasInit$.subscribe(isInit => {
      if (isInit.facebook) {
        this.socialService.facebookShare(this.router.url);
      }
    });

    this.socialService.facebookInit();
  }

  public updatePropertyAndActionState(property: Property) {
    if (this.actionStateService.actionState.mode === PropertyActionMode.Editing) {
      this.propertyService.update(property)
        .do(i => this.property = i)
        .subscribe(i => this.doAction());
    } else {
      this.doAction();
    }
  }

  private doAction() {
    this.actionStateService.doAction(this.property);
  }

  private updateMapOptions(property: Property) {
    this.mapOptions = {
      height: HEIGHT,
      zoomLevel: ZOOM_LEVEL,
      interactive: false,
      center: {
        latitude: property.latitude,
        longitude: property.longitude
      },
    }
  }

  ngOnInit() {
    this.analyticsService.recordAction('page-load');
    
    getHoneybadger().setContext({ view: 'property-view' });
    // Maybe put this on the root component, let's play with it for a while first

    this.isEditing$ = this.actionStateService.isEditing$;
    this.actionState$ = this.actionStateService.actionState$;
    this.hasAuth$ = this.userService.hasAuth$;

    this.route.data.forEach((data: { property: Property }) => {
      this.property = data.property;
    });

    this.updateMapOptions(this.property);
    this.tweetText = this.socialService.makeTwitterUrl(this.property);
    this.propertySeoService.addProperties(this.renderer, [this.property]);
    this.actionStateService.setState(this.property);
  }
}
