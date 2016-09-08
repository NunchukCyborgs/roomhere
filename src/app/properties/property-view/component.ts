import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../users/index';
import { NumberTicker } from '../../components/number-ticker/component';
import { UploadProgress } from '../../components/upload-progress/component';
import { ImageUpload } from '../../components/image-upload/component';
import { ServerUnsafeService } from '../../services/server-unsafe.service';
import { SeoService } from '../../services/seo.service';
import { SocialService } from '../../services/social.service';
import { PropertyService, Property, PropertyImages, PropertyReviews, SimilarProperties, PropertyEditImage,
  PropertyMap, MapOptions, PropertyAmenities, PropertyActionsGroup, PropertyEdit, PropertyActionStateService } from '../index';
import { BASE_API_URL } from '../../config'
import { HttpService } from '../../services/http.service';
import { ImageUploadService, PendingFile } from '../../services/image-upload.service';
import { StickDirective } from '../../sticky.directive';

declare let $: any;
declare let require: (string) => string;

const ZOOM_LEVEL: number = 16;
const HEIGHT: string = '100px';

@Component({
  moduleId: __filename,
  selector: 'property-view',
  directives: [PropertyReviews, SimilarProperties, PropertyMap, PropertyImages,
    PropertyAmenities, NumberTicker, PropertyActionsGroup, StickDirective, PropertyEditImage,
    UploadProgress, ImageUpload, PropertyEdit],
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class PropertyView implements OnDestroy {
  public property: Property;
  public mapOptions: MapOptions;
  public isEditing$: Observable<boolean>;
  public actionText$: Observable<string>;
  public tweetText: string;
  public pendingFiles$: Observable<PendingFile[]>;
  private sub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private userService: UserService,
    private unsafe: ServerUnsafeService,
    private seoService: SeoService,
    private socialService: SocialService,
    private http: HttpService,
    private imageUploadService: ImageUploadService,
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

  public updateProperty() {
    this.propertyService.update(this.property)
      .subscribe(i => this.property = i);
  }

  public doAction() {
    this.actionStateService.doAction(this.userService.user, this.property);
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
    this.pendingFiles$ = this.imageUploadService.pendingFiles$;
    this.isEditing$ = this.actionStateService.isEditing$;
    this.actionText$ = this.actionStateService.actionText$;

    this.userService.user$.subscribe(i => this.actionStateService.setState(i, this.property));

    this.sub = this.route.params
      .flatMap(params => this.propertyService.getPropertyBySlug$(params['slug']))
      .do((property: Property) => this.updateMapOptions(property))
      .do((property: Property) => this.property = property)
      .do((property: Property) => this.tweetText = this.socialService.makeTwitterUrl(property))
      .do((property: Property) => this.seoService.addPropertyTags(property))
      .subscribe((property: Property) => this.actionStateService.setState(this.userService.user, property));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
