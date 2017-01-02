import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { isBrowser } from 'angular2-universal';
import { Observable } from 'rxjs/Observable';
import { Property } from '../../shared/dtos/property';

export interface PropertyPreviewOptions {
  noLink: boolean;
}

@Component({
  selector: 'property-preview',
  styleUrls: ['./styles.css'],
  templateUrl: 'template.html'
})
export class PropertyPreview {
  @Input() property: Property;
  @Input() options: PropertyPreviewOptions;

  public BASE_API_URL: string = BASE_API_URL;
  public target: string;

  constructor(private router: Router) { }

  public get propertyUrl(): string {
    return `/${DEFAULT_TENANT}/${this.property.slug}`
  }

  public get baseLink(): string {
    return this.router.url;
  }

  ngOnInit() {
    if (isBrowser) {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      this.target = width > 780 ? '_blank' : null;
    }
  }
}
