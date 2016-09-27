import { Renderer, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BASE_URL } from '../config';
import { Property } from '../properties/property';

export interface Tags {
  description: string;
  title: string;
  image: string;
}

@Injectable()
export class SeoService {
  public getDescription(property: Property): string {
    return `Check out this rental property at ${property.address1} on Roomhere.io!`;
  }

  public addPropertyTags(renderer: Renderer, property: Property): void {
    const description = this.getDescription(property);
    const title = `Roomhere.io property at ${property.address1}`;
    const imageUrl = property.images && property.images.length ? property.images[0].url : '';

    this.addTags({ description: description, title: title, image: imageUrl }, renderer);
  }

  public addBaseTags(renderer: Renderer) {
    const description = 'Roomhere is the rental property solution for Cape Girardeau, MO. Find the most complete rental listings of the area at Roomhere.';
    const title = 'Roomhere: The Best Place to Find Home';
    const imageUrl = '/images/white_logo_transparent_background.png';

    this.addTags({ description: description, title: title, image: imageUrl }, renderer);
  }

  public addTags(baseTags: Tags, renderer: Renderer): void {
    const tags: Array<{ property: string, content: string }> = [
      { property: 'description', content: baseTags.description },
      { property: 'og:title', content: baseTags.title },
      { property: 'og:type', content: 'website' },
      { property: 'og:description', content: baseTags.description },
      { property: 'og:url', content: BASE_URL + this.router.url },
      { property: 'og:image', content: baseTags.image },
      { property: 'twitter:card', content: 'summary' },
      { property: 'twitter:site', content: '@roomhere' },
      { property: 'twitter:image', content: baseTags.image },
      { property: 'description', content: baseTags.description },
      { property: 'twitter:title', content: baseTags.title },
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
