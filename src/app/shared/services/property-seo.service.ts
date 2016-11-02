import { Renderer, Inject, Injectable } from '@angular/core';

import { DEFAULT_TENANT, DEFAULT_TENANT_PRETTY } from '../../config';
import { Property, Image } from '../dtos/property';
import { SeoService } from './seo.service';
import { SingleFamilyResidence, PostalAddress, GeoCoordinates, createSchema, Review, Tag, Person, RoomhereOrganization } from '../dtos/seo';

@Injectable()
export class PropertySeoService {
  public addProperties(renderer: Renderer, properties: Property[]): void {
    this.addPropertiesSchema(renderer, properties);
    this.addPropertyTags(renderer, properties);
    this.seoService.setTitle(this.getPropertiesTitle(properties));
  }

  public getPropertyDescription(property: Property): string {
    return `Check out this rental property at ${property.address1} on Roomhere.io!`;
  }

  private getPropertiesTitle(properties: Property[]): string {
    return properties.length === 1 ? `Rent ${properties[0].address1} | ${this.seoService.TITLE}` : this.seoService.TITLE;
  }

  private getPropertySchema(p: Property): SingleFamilyResidence {
    return Object.assign(new SingleFamilyResidence(), {
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
      numberOfRooms: p.bedrooms,
      reviews: this.getReviewsSchema(p),
    });
  }

  private getReviewsSchema(p: Property): Review[] {
    if (!p.reviews || !p.reviews.length) {
      return undefined;
    }

    return p.reviews.map(i => Object.assign(new Review(), {
      author: i.is_anonymous ? new Person(i.name) : undefined,
      reviewRating: i.property_rating,
      reviewBody: i.body,
      publisher: new RoomhereOrganization,
    }));
  }

  private addSchema(renderer: Renderer, schema: Tag, Type: any) {
    this.removeSchema(new Type()['@type']);
    this.seoService.createTag(schema, renderer);
  }

  private addPropertiesSchema(renderer: Renderer, properties: Property[]): void {
    this.addSchema(renderer, createSchema(properties.map(i => this.getPropertySchema(i))), SingleFamilyResidence);
  }

  private removeSchema(type: string) {
    const schema = this.seoService.tags.filter(i => i.text && i.text.includes(type));
    schema.forEach(i => this.seoService.removeTag(i));
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
      description = this.seoService.DESCRIPTION;
      image = this.seoService.IMAGE;
    }

    this.seoService.addTags({ description: description, title: title, image: image }, renderer);
  }

  constructor(private seoService: SeoService) { }
}
