import { Image } from './property';

export interface Tags {
  description: string;
  title: string;
  image: Image
}

export interface Tag {
  name: string;
  attributes: KVP[];
  element?: any;
  text?: string;
}

export interface KVP {
  name: string,
  value: string
}

export interface Schema {
  '@type': string;
}

export function createSchema(schema: Schema | Schema[]): Tag {
  const context = { '@context': 'http://schema.org' };
  const contextSchema = Array.isArray(schema) ? schema.map(i => Object.assign({}, context, i)) : Object.assign({}, context, schema);
  return { name: 'script', text: JSON.stringify(contextSchema), attributes: [{ name: 'type', value: 'application/ld+json' }] };
}

export class PostalAddress implements Schema {
  '@type': string = 'PostalAddress';
  addressCountry?: string;
  streetAddress?: string;
  postalCode?: string;
  addressRegion?: string;
  addressLocality?: string;
}

export class GeoCoordinates implements Schema {
  '@type': string = 'GeoCoordinates';
  latitude: string;
  longitude: string;
}

export class SingleFamilyResidence implements Schema {
  '@type': string = 'SingleFamilyResidence';

  numberOfRooms?: number;
  occupancy?: number;
  amenityFeature?: KVP[];
  floorSize?: string;
  permittedUsage?: string;
  petsAllowed?: boolean;
  additionalProperty?: string;
  address?: PostalAddress;
  aggregateRating?: string;
  branchCode?: string;
  containedInPlace?: string;
  containsPlace?: string;
  event?: string;
  faxNumber?: string;
  geo?: GeoCoordinates;
  globalLocationNumber?: string;
  hasMap?: string;
  isicV4?: string;
  logo?: string;
  openingHoursSpecification?: string;
  photo?: string;
  review?: string;
  smokingAllowed?: string;
  specialOpeningHoursSpecification?: string;
  telephone?: string;
  Thing?: string;
  additionalType?: string;
  alternateName?: string;
  description?: string;
  disambiguatingDescription?: string;
  image?: string;
  mainEntityOfPage?: string;
  name?: string;
  potentialAction?: string;
  sameAs?: string;
  url?: string;
}

export class Review implements Schema {
  '@type': string = 'Review';
  itemReviewed: any;
  author: any;
  reviewRating: ReviewRating;
  publisher: Organization;
}

export class ReviewRating implements Schema {
  '@type': string = 'Review';
  ratingValue: number;
  bestRating: number = 5;
}

export class Organization implements Schema {
  '@type': string = 'Organization';
  url: string;
  logo: string;
  contactPoint: ContactPoint;
  sameAs: string[];
}

export class ContactPoint implements Schema {
  '@type': string = 'ContactPoint';
  telephone: string;
  contactType: string;
  email: string;
}

export class RoomhereContactPoint extends ContactPoint implements Schema {
  constructor() {
    super();
    this.telephone = '+1-573-290-2363';
    this.contactType = 'customer service';
    this.email = 'support@roomhere.io';
  }
}

export class RoomhereOrganization extends Organization implements Schema {
  constructor() {
    super();
    this.url = 'https://roomhere.io';
    this.logo = 'https://roomhere.io/images/white_logo_transparent_background.png';
    this.sameAs = ['https://www.facebook.com/roomhereapp', 'https://twitter.com/roomhere'];
    this.contactPoint = new RoomhereContactPoint();
  }
}
