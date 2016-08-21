import { Component, Input } from '@angular/core';
import { PropertyService, Property } from './property.service';

@Component({
  moduleId: __filename,
  selector: 'similar-properties',
  styles: [`
  `],
  template: `
      <div>
        <div class="column">
          <img class="thumbnail" src="http://placehold.it/350x200">
          <h5>Other Rental <small>$22</small></h5>
          <p>In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper,
            magna diam.</p><a class="button hollow tiny expanded" href="#">view now</a>
        </div>
        <div class="column">
          <img class="thumbnail" src="http://placehold.it/350x200">
          <h5>Other Rental <small>$22</small></h5>
          <p>In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper,
            magna diam.</p><a class="button hollow tiny expanded" href="#">view now</a>
        </div>
        <div class="column">
          <img class="thumbnail" src="http://placehold.it/350x200">
          <h5>Other Rental <small>$22</small></h5>
          <p>In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper,
            magna diam.</p><a class="button hollow tiny expanded" href="#">view now</a>
        </div>
        <div class="column">
          <img class="thumbnail" src="http://placehold.it/350x200">
          <h5>Other Rental <small>$22</small></h5>
          <p>In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper,
            magna diam.</p><a class="button hollow tiny expanded" href="#">view now</a>
        </div>
      </div>
  `
})
export class SimilarProperties {
  @Input() property: Property;

}
