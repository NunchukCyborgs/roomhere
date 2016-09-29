import { Renderer, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BASE_URL } from '../config';
import { Property, Image } from '../properties/property';

export interface Tags {
  description: string;
  title: string;
  image: Image
}

interface Tag {
  property: string;
  content: string;
  element?: any;
}

@Injectable()
export class SeoService {
  private tags: Tag[] = [];

  public getDescription(property: Property): string {
    return `Check out this rental property at ${property.address1} on Roomhere.io!`;
  }

  public addPropertyTags(renderer: Renderer, property: Property): void {
    const description = this.getDescription(property);
    const title = `Roomhere.io property at ${property.address1}`;

    this.addTags({ description: description, title: title, image: property.images[0] }, renderer);
  }

  public addBaseTags(renderer: Renderer) {
    const description = 'Roomhere is the rental property solution for Cape Girardeau, MO. Find the most complete rental listings of the area at Roomhere.';
    const title = 'Roomhere: The Best Place to Find Home';
    const imageUrl = BASE_URL + '/images/white_logo_transparent_background.png';
    const image: Image = { url: imageUrl, height: '187', width: '240' };

    this.addTags({ description: description, title: title, image: image }, renderer);
  }

  public addTags(baseTags: Tags, renderer: Renderer): void {
    const tags: Tag[] = [
      { property: 'description', content: baseTags.description },
      { property: 'og:title', content: baseTags.title },
      { property: 'og:type', content: 'website' },
      { property: 'og:description', content: baseTags.description },
      { property: 'og:url', content: BASE_URL + this.router.url },
      { property: 'og:image', content: baseTags.image.url },
      { property: 'og:image:width', content: baseTags.image.width.toString() },
      { property: 'og:image:height', content: baseTags.image.height.toString() },
      { property: 'twitter:card', content: 'summary' },
      { property: 'twitter:site', content: '@roomhere' },
      { property: 'twitter:image', content: baseTags.image.url },
      { property: 'twitter:title', content: baseTags.title },
    ];

    for (let tag of tags) {
      const existingTag = this.tags.find(i => i.property === tag.property);
      const elem = (existingTag && existingTag.element) || renderer.createElement(this.document.head, 'meta');
      renderer.setElementAttribute(elem, 'property', tag.property);
      renderer.setElementAttribute(elem, 'content', tag.content);
      if (!existingTag) {
        this.tags.push(Object.assign({}, tag, { element: elem }));
      }
    }
  }

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: any
  ) {
  }
}
