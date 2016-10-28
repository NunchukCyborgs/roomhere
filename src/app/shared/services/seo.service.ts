// $('.definition-table tbody.supertype tr th a').map(function(i, a) { return a.text})
import { Renderer, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { isBrowser, isNode } from 'angular2-universal';

import { DEFAULT_TENANT } from '../../config';
import { Property, Image } from '../dtos/property';
import {Tag, SingleFamilyResidence, PostalAddress, GeoCoordinates, Tags} from '../dtos/seo';

@Injectable()
export class SeoService {
  private tags: Tag[] = [];
  private propertySchema: {
    tag?: any,
    schema: SingleFamilyResidence[]
  } = { schema: [] };

  public addSchema(renderer: Renderer, properties: Property[]): void {
    this.propertySchema.schema = [];

    for (let p of properties) {
      const schema = Object.assign(new SingleFamilyResidence(), {
        address: Object.assign(new PostalAddress(), {
          addressCountry: 'US',
          addressLocality: DEFAULT_TENANT.replace('-', ' '),
          postalCode: p.zipcode,
          streetAddress: p.address1,
        }),
        photo: p.images[0].url,
        amenityFeature: p.amenities.map(i => ({ name: i.name, value: Boolean(i.active) })),
        geo: Object.assign(new GeoCoordinates(), { latitude: p.latitude, longitude: p.longitude }),
        smokingAllowed: Boolean(p.amenities.find(i => i.name === 'Smoking Allowed')),
        petsAllowed: Boolean(p.amenities.find(i => i.name === 'Pet Friendly')),
        description: p.description,
        url: `${BASE_URL}/${DEFAULT_TENANT}/${p.slug}`,
        numberOfRooms: p.bedrooms
      });

      this.propertySchema.schema.push(schema);
    }

    this.propertySchema.tag = this.propertySchema.tag || renderer.createElement(this.document.head, 'script');

    renderer.setElementAttribute(this.propertySchema.tag, 'type', 'application/ld+json');
    renderer.setText(this.propertySchema.tag, JSON.stringify(this.propertySchema.schema));
  }

  public getDescription(property: Property): string {
    return `Check out this rental property at ${property.address1} on Roomhere.io!`;
  }

  public addPropertyTags(renderer: Renderer, property: Property): void {
    const description = this.getDescription(property);
    const title = `Roomhere.io property at ${property.address1}`;

    try {
      this.addTags({ description: description, title: title, image: property.images[0] }, renderer);
    } catch (err) {
      if (isNode) { throw new Error('no property images error. Property: ' + JSON.stringify(property)); }
    }
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
      { property: 'og:image:width', content: baseTags.image.width },
      { property: 'og:image:height', content: baseTags.image.height },
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
