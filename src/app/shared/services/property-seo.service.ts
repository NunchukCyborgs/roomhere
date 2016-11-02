import { Renderer, Inject, Injectable } from '@angular/core';

import { DEFAULT_TENANT, DEFAULT_TENANT_PRETTY } from '../../config';
import { Property, Image } from '../dtos/property';
import { SeoService } from './seo.service';
import { SingleFamilyResidence, PostalAddress, GeoCoordinates, createSchema } from '../dtos/seo';

@Injectable()
export class PropertySeoService {
  public addProperties(renderer: Renderer, properties: Property[]): void {
    this.addPropertySchema(renderer, properties);
    this.addPropertyTags(renderer, properties);
    this.seoService.setTitle(this.getPropertiesTitle(properties));
  }

  public getPropertyDescription(property: Property): string {
    return `Check out this rental property at ${property.address1} on Roomhere.io!`;
  }

  private getPropertiesTitle(properties: Property[]): string {
    return properties.length === 1 ? `Rent ${properties[0].address1} | ${this.seoService.TITLE}` : this.seoService.TITLE;
  }

  private addPropertySchema(renderer: Renderer, properties: Property[]): void {
    this.removePropertySchema();
    let propertySchema = [];

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

      propertySchema.push(schema);
    }

    this.seoService.createTag(createSchema(propertySchema), renderer);
  }

  private removePropertySchema() {
    const sampleSchema = new SingleFamilyResidence();
    const schema = this.seoService.tags.filter(i => i.text && i.text.includes(sampleSchema['@type']));
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
