import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../users/index';
import { NumberTicker } from '../number-ticker.component';
import { ServerUnsafeService } from '../services/server-unsafe.service';
import { SeoService } from '../services/seo.service';
import { SocialService } from '../services/social.service';
import { PropertyService, Property, PropertyImages, PropertyReviews, SimilarProperties,
  PropertyMap, MapOptions, PropertyAmenities, PropertyAction, PropertyActionState, PropertyActionStates, PropertyActionsGroup } from './index';

import { StickDirective } from '../sticky.directive';

const ZOOM_LEVEL: number = 16;
const HEIGHT: string = '100px';

declare let $: any;

@Component({
  moduleId: __filename,
  selector: 'property-view',
  directives: [PropertyReviews, SimilarProperties, PropertyMap, PropertyImages,
    PropertyAmenities, NumberTicker, PropertyActionsGroup, StickDirective],
  styles: [`
    .property-view-container {
       position: relative;
       padding-bottom: 150px;
   }
   textarea {
        max-width: 100%;
        min-height: 150px;
    }
   em,i {
       font-size: 1.8rem;
       position: relative;
       top: 50%;
       transform: translateY(-50%);
   }
   .call-to-actions--top .rent-now {
       margin-bottom: 10px;
   }
   .call-to-actions--top {
       position: absolute;
       top: 10px;
       right: 10px;
       border-radius: 5%;
       z-index: 10;
       box-shadow: inset 1px 1px 3px #999;
       width: 350px;
    }
    .stat {
        height: 133px;
    }
    .ver-center{
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
    
   @media (min-width: 1025px) {
       .marg-top {
           margin-top: 40px;
       }
       .marg-btm {
           margin-bottom: 40px;
       }
   }
   
   @media (max-width: 1024px) {
       .call-to-actions--top {
           width: 300px;
       }
       .marg-top {
           margin-top: 20px;
       }
       .marg-btm {
           margin-bottom: 20px;
       }
   }
   
   @media (max-width: 640px) {
       .callout-bottom {
           border-radius: 5%;
           box-shadow: inset 1px 1px 3px #999;
       }
   }
   @media (max-width: 480px) {
       .marg-top {
           margin-top: 20px;
       }
    .callout-bottom {
           border-radius: 5%;
           box-shadow: inset 1px 1px 3px #999;
           background:#fff;
       }
    .sticky-actions {
       position: fixed;
       bottom: 20px;
       left: 5px;
       right: 5px;
        }
    .stat {
       font-size:2.1rem;
        }
   }
   
  `],
  templateUrl: './property-view.component.html'
})
export class PropertyView implements OnDestroy {
  public property: Property;
  public mapOptions: MapOptions;
  public propertyActionState: PropertyActionState;
  public isEditing: boolean = false;
  public tweetText: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private userService: UserService,
    private unsafe: ServerUnsafeService,
    private seoService: SeoService,
    private socialService: SocialService
  ) {
  }

  public doPropertyAction(state: PropertyActionStates) {
    switch (state) {
      case PropertyActionStates.Edit:
        if (this.isEditing) {
          this.propertyService.update(this.property).subscribe(() => this.isEditing = false);
        } else {
          this.isEditing = true;
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
