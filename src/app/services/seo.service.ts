import { Renderer, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BASE_URL } from '../config';
import { Property } from '../properties/index';

@Injectable()
export class SeoService {
  public getDescription(property: Property): string {
    return `Check out this rental property at ${property.address1} on Roomhere.io!`;
  }

  public addPropertyTags(property: Property): void {
    const description = this.getDescription(property);
    const title = `Roomhere.io property at ${property.address1}`;
    const imageUrl = property.images && property.images.length ? BASE_URL + property.images[0].url : '';

    const tags: Array<{ key: string, value: string }> = [
      { key: 'description', value: description },
      { key: 'og:title', value: title},
      { key: 'og:type', value: 'website' },
      { key: 'og:description', value: description },
      { key: 'og:url', value: BASE_URL + this.router.url },
      { key: 'og:image', value: imageUrl },
      { key: 'twitter:card', value: 'summary' },
      { key: 'twitter:site', value: '@roomhere' },
      { key: 'twitter:image', value: imageUrl },
      { key: 'description', value: description },
      { key: 'twitter:title', value: title },
    ];

    for (let tag of tags) {
      // const elem = this.renderer.createElement(this.document.head, 'meta');
      // this.renderer.setElementAttribute(elem, tag.key, tag.value);
    }
  }

  constructor(
    // private renderer: Renderer,
    private router: Router,
    @Inject(DOCUMENT) private document: any
    ) {
  }
}