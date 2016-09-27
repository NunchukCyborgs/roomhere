import { Renderer, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BASE_URL } from '../config';
import { Property } from '../properties/property';

@Injectable()
export class SeoService {
  public getDescription(property: Property): string {
    return `Check out this rental property at ${property.address1} on Roomhere.io!`;
  }

  public addPropertyTags(renderer: Renderer, property: Property): void {
    const description = this.getDescription(property);
    const title = `Roomhere.io property at ${property.address1}`;
    const imageUrl = property.images && property.images.length ? property.images[0].url : '';

    const tags: Array<{ property: string, content: string }> = [
      { property: 'description', content: description },
      { property: 'og:title', content: title},
      { property: 'og:type', content: 'website' },
      { property: 'og:description', content: description },
      { property: 'og:url', content: BASE_URL + this.router.url },
      { property: 'og:image', content: imageUrl },
      { property: 'twitter:card', content: 'summary' },
      { property: 'twitter:site', content: '@roomhere' },
      { property: 'twitter:image', content: imageUrl },
      { property: 'description', content: description },
      { property: 'twitter:title', content: title },
    ];

    for (let tag of tags) {
      const elem = renderer.createElement(this.document.head, 'meta');
      renderer.setElementAttribute(elem, 'property', tag.property);
      renderer.setElementAttribute(elem, 'content', tag.content);
    }
  }

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: any
    ) {
  }
}
