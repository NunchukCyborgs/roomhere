import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../users/index';
import { NumberTicker } from '../../components/number-ticker/component';
import { ServerUnsafeService } from '../../services/server-unsafe.service';
import { SeoService } from '../../services/seo.service';
import { SocialService } from '../../services/social.service';
import { PropertyService, Property, PropertyImages, PropertyReviews, SimilarProperties, PropertyEditImage,
  PropertyMap, MapOptions, PropertyAmenities, PropertyAction, PropertyActionState, PropertyActionStates, PropertyActionsGroup } from './index';
import { BASE_API_URL } from '../config'
import { HttpService } from '../services/http.service';

import { StickDirective } from '../../sticky.directive';

const ZOOM_LEVEL: number = 16;
const HEIGHT: string = '100px';

declare let $: any;
declare let require: (string) => string;

@Component({
  moduleId: __filename,
  selector: 'property-view',
  directives: [PropertyReviews, SimilarProperties, PropertyMap, PropertyImages,
    PropertyAmenities, NumberTicker, PropertyActionsGroup, StickDirective, PropertyEditImage],
  styles: [require('./styles.scss').toString()],
  templateUrl: 'template.html'
})
export class PropertyView implements OnDestroy {
  public property: Property;
  public mapOptions: MapOptions;
  public propertyActionState: PropertyActionState;
  public isEditing: boolean = false;
  public tweetText: string;
  private dropZoneTimeout: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private userService: UserService,
    private unsafe: ServerUnsafeService,
    private seoService: SeoService,
    private socialService: SocialService,
    private http: HttpService
  ) {
  }

  public doPropertyAction(state: PropertyActionStates) {
    switch (state) {
      case PropertyActionStates.Edit:
        if (this.isEditing) {
          this.propertyService.update(this.property).subscribe(() => this.isEditing = false);
        } else {
          this.isEditing = true;
          this.imageUploadInit();
        }
        break;
      case PropertyActionStates.Claim:
        console.log('claim');
        break;
      case PropertyActionStates.Rent:
        console.log('rent');
        break;
    }
  }

  public shareFacebook() {
    this.socialService.hasInit$.subscribe(isInit => {
      if (isInit.facebook) {
        this.socialService.facebookShare(this.router.url);
      }
    });

    this.socialService.facebookInit();
  }

  private imageUploadInit() {
    this.unsafe.tryUnsafeCode(() => {
      const fileUpload = $('#FileUpload');
      const URL = `${BASE_API_URL}/properties/${this.property.slug}/images`;

      fileUpload.fileupload({
        // Uncomment the following to send cross-domain cookies:
        withCredentials: true,
        dropZone: $('#dropzone'),
        url: URL,
        type: 'POST',
        maxFileSize: 999000,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        add: (e, data) => {
          $('#dropzone').removeClass("in");
          $.each(data.files, (index, file) => {
            console.log('Added file: ' + file.name);
          });
          let h = { };
          this.http.headers.forEach((values: string[], name: string) => {
            h[name] = values[0];
          });
          delete h['Content-Type'];
          data.headers = h;
          data.submit();
        },
        done: (e, data) => {
          let x = data.jqXHR;
          this.http.setAuthHeaders(x.getResponseHeader('access-token'), x.getResponseHeader('client'), x.getResponseHeader('uid'));
        }
      });

      fileUpload.fileupload(
        'option',
        'redirect',
        window.location.href.replace(
          /\/[^\/]*$/,
          '/cors/result.html?%s'
        )
      );
      $(document).bind('dragover', (e) => {
        let dropZone = $('#dropzone');
        var found = false,
        node = e.target;
        do {
          if (node === dropZone[0]) {
            found = true;
            break;
          }
          node = node.parentNode;
        } while (node != null);
        if (found) {
          dropZone.addClass('in');
        } else {
          dropZone.removeClass('in');
        }
      });
    }, '$ is undefined');
  }


  public uploadImage() {


    // Enable iframe cross-domain access via redirect option:

    // Load existing files:
    // fileUpload.addClass('fileupload-processing');
  }

  private sub: Subscription;

  private updateMapOptions(property: Property) {
    this.mapOptions = {
      height: HEIGHT,
      zoomLevel: ZOOM_LEVEL,
      center: {
        latitude: property.latitude,
        longitude: property.longitude
      },
    }
  }

  ngOnInit() {
    this.sub = this.route.params
      .flatMap(params => this.propertyService.getPropertyBySlug$(params['slug']))
      .do((property: Property) => this.updateMapOptions(property))
      .do((property: Property) => this.property = property)
      .do((property: Property) => this.tweetText = this.socialService.makeTwitterUrl(property))
      .do((property: Property) => this.seoService.addPropertyTags(property))
      .subscribe((i) => this.userService.user$.subscribe(i => this.propertyActionState = PropertyAction.getState(this.property, i)));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
