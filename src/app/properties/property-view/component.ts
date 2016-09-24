import { Component, OnDestroy, Renderer } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../users/user.service';
import { MapOptions } from '../../components/property-map/component';
import { SeoService } from '../../services/seo.service';
import { SocialService } from '../../services/social.service';
import { Property } from '../property';
import { PropertyActionState, PropertyActionMode } from '../property-action-state.service';
import { BASE_API_URL } from '../../config'
import { HttpService } from '../../services/http.service';
import { ImageUploadService, PendingFile } from '../../services/image-upload.service';
import { PropertyService } from '../property.service';
import { PropertyActionStateService } from '../property-action-state.service';

const ZOOM_LEVEL: number = 16;
const HEIGHT: string = '350px';

@Component({
  selector: 'property-view',
  styles: [require('./styles.scss').toString()],
  template: require('./template.html').toString()
})
export class PropertyView {
  public property: Property = new Property();
  public mapOptions: MapOptions;
  public isEditing$: Observable<boolean>;
  public actionState$: Observable<PropertyActionState>;
  public tweetText: string;
  private sub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private userService: UserService,
    private seoService: SeoService,
    private renderer: Renderer,
    private socialService: SocialService,
    private http: HttpService,
    private actionStateService: PropertyActionStateService
  ) {
  }

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
    this.isEditing$ = this.actionStateService.isEditing$;
    this.actionState$ = this.actionStateService.actionState$;

    this.sub = this.route.params
      .flatMap(params => this.propertyService.getPropertyBySlug$(params['slug']))
      .do((property: Property) => this.updateMapOptions(property))
      .do((property: Property) => this.property = property)
      .do((property: Property) => this.tweetText = this.socialService.makeTwitterUrl(property))
      .do((property: Property) => this.seoService.addPropertyTags(this.renderer, property))
      .subscribe((property: Property) => this.actionStateService.setState(property));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  
}
