import { Component, Input } from '@angular/core';
import { PropertyService, Property } from './index';

@Component({
  moduleId: __filename,
  selector: 'property-reviews',
  styles: [`
  `],
  template: `
    <div>
      <h4>Reviews</h4>
      <div class="media-object stack-for-small">
          <div class="media-object-section"><img class="thumbnail" src="http://placehold.it/200x200"></div>
          <div class="media-object-section">
              <h5>Mike Stevenson</h5>
              <p>I'm going to improvise. Listen, there's something you should know about me... about inception. An idea is like a virus, resilient, highly contagious. The smallest seed of an idea can grow. It can grow to define or destroy you.</p>
          </div>
      </div>
      <div class="media-object stack-for-small">
          <div class="media-object-section"><img class="thumbnail" src="http://placehold.it/200x200"></div>
          <div class="media-object-section">
              <h5>Mike Stevenson</h5>
              <p>I'm going to improvise. Listen, there's something you should know about me... about inception. An idea is like a virus, resilient, highly contagious. The smallest seed of an idea can grow. It can grow to define or destroy you</p>
          </div>
      </div>
      <div class="media-object stack-for-small">
          <div class="media-object-section"><img class="thumbnail" src="http://placehold.it/200x200"></div>
          <div class="media-object-section">
              <h5>Mike Stevenson</h5>
              <p>I'm going to improvise. Listen, there's something you should know about me... about inception. An idea is like a virus, resilient, highly contagious. The smallest seed of an idea can grow. It can grow to define or destroy you</p>
          </div>
      </div>
      <label>My Review
          <textarea placeholder="None"></textarea>
      </label>
      <button class="button">Submit Review</button>
    </div>
  `
})
export class PropertyReviews {
  @Input() property: Property;

}