// $('.definition-table tbody.supertype tr th a').map(function(i, a) { return a.text})
import { Renderer, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { isBrowser, isNode } from 'angular2-universal';

import { DEFAULT_TENANT, DEFAULT_TENANT_PRETTY } from '../../config';
import { Property, Image } from '../dtos/property';
import { Tag, SingleFamilyResidence, PostalAddress, GeoCoordinates, Tags } from '../dtos/seo';

@Injectable()
export class SeoService {
  private DESCRIPTION = 'Roomhere is the rental property solution for Cape Girardeau, MO. Find the most complete rental listings of the area at Roomhere.';
  private TITLE = 'Cape Girardeau Apartments and Houses For Rent | RoomHere';
  private IMAGE = BASE_URL + '/images/white_logo_transparent_background.png';
  private tags: Tag[] = [];
  private propertySchema: {
    tag?: any,
    schema: SingleFamilyResidence[]
  } = { schema: [] };

  public addBaseTags(renderer: Renderer) {
    const imageUrl = this.IMAGE;
    const image: Image = { url: imageUrl, height: '187', width: '240' };

    this.addTags({ description: this.DESCRIPTION, title: this.TITLE, image: image }, renderer);
    this.setTitle(this.TITLE);
  }

  public prependTitle(title: string): void {
    this.document.title = `${title} | ${this.TITLE}`;
  }

  public setTitle(title: string): void {
    this.document.title = title;
  }

  private addTags(baseTags: Tags, renderer: Renderer): void {
    const tags: Tag[] = this.getTags(baseTags);

    for (let tag of tags) {
      const existingTag = this.getExistingTag(tag);
      const elem = this.getElement(tag, existingTag, renderer);
      this.createElement(tag, elem, renderer);

      if (!existingTag) {
        this.tags.push(Object.assign({}, tag, { element: elem }));
      }
    }
  }

  private getTags(baseTags: Tags): Tag[] {
    return [
      { name: 'meta', attributes: [{ name: 'property', value: 'description' }, { name: 'content', value: baseTags.description }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'og:title' }, { name: 'content', value: baseTags.title }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'og:type' }, { name: 'content', value: 'website' }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'og:description' }, { name: 'content', value: baseTags.description }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'og:url' }, { name: 'content', value: BASE_URL + this.router.url }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'og:image' }, { name: 'content', value: baseTags.image.url }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'og:image:width' }, { name: 'content', value: baseTags.image.width }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'og:image:height' }, { name: 'content', value: baseTags.image.height }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'twitter:card' }, { name: 'content', value: 'summary' }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'twitter:site' }, { name: 'content', value: '@roomhere' }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'twitter:image' }, { name: 'content', value: baseTags.image.url }] },
      { name: 'meta', attributes: [{ name: 'property', value: 'twitter:title' }, { name: 'content', value: baseTags.title }] },
    ];
  }

  private createElement(tag: Tag, elem: any, renderer: Renderer) {
    if (tag.text) {
      renderer.setText(elem, tag.text);
    }

    for (let attr of tag.attributes) {
      renderer.setElementAttribute(elem, attr.name, attr.value);
    }
  }

  private getExistingTag(newTag: Tag): Tag {
    return this.tags.find(tag => {
      return tag.name === newTag.name && tag.text === newTag.text && newTag.attributes.every((kvp, index) => {
        return tag.attributes[index].name === kvp.name && tag.attributes[index].value === kvp.value
      })
    });
  }

  private getElement(tag: Tag, existingTag: Tag, renderer: Renderer): any {
    return (existingTag && existingTag.element) || renderer.createElement(this.document.head, tag.name)
  }

  public addProperties(renderer: Renderer, properties: Property[]): void {
    this.addPropertySchema(renderer, properties);
    this.addPropertyTags(renderer, properties);
    this.setTitle(this.getPropertiesTitle(properties));
  }

  public getPropertyDescription(property: Property): string {
    return `Check out this rental property at ${property.address1} on Roomhere.io!`;
  }

  private getPropertiesTitle(properties: Property[]): string {
    return properties.length === 1 ? `Rent ${properties[0].address1} | ${this.TITLE}` : this.TITLE;
  }

  private addPropertySchema(renderer: Renderer, properties: Property[]): void {
    this.propertySchema.schema = [];

    for (let p of properties) {
      const schema = Object.assign(new SingleFamilyResidence(), {
        address: Object.assign(new PostalAddress(), {
          addressCountry: 'US',
          addressLocality: DEFAULT_TENANT_PRETTY,
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

  private addPropertyTags(renderer: Renderer, properties: Property[]): void {
    let description;
    let title = this.getPropertiesTitle(properties);
    let image;

    if (properties.length === 1) {
      description = this.getPropertyDescription(properties[0]);
      image = properties[0].images[0];
    } else {
      const prices = properties.map(i => i.price).filter(i => i);
      const minPrice = Math.min(...prices);
      description = this.DESCRIPTION;
      image = this.IMAGE;
    }

    this.addTags({ description: description, title: title, image: image }, renderer);
  }

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: any
  ) {
  }
}
