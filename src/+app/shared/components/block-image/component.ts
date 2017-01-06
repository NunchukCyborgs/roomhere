import { Component, Input } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'block-image',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html'
})
export class BlockImage {
  @Input() alt: string;
  @Input() image: string;
}
