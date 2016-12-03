import { Image } from './property';

export interface Tags {
  description?: string;
  title?: string;
  image?: Image
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
  aggregateRating?: AggregateRating;
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
  reviews?: Review[];
  smokingAllowed?: string;
  specialOpeningHoursSpecification?: string;
  telephone?: string;
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
  author: Person;
  reviewRating: ReviewRating;
  publisher: Organization;
  reviewBody: string;
}

export class Person implements Schema {
  '@type': string = 'Person';
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

export class ReviewRating implements Schema {
  '@type': string = 'Review';
  ratingValue: number;
  bestRating: number = 5;
}

export class AggregateRating implements Schema {
  '@type': string = 'AggregateRating';
  ratingValue: number;
  bestRating: number;
  ratingCount: number;
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
    this.url = BASE_URL;
    this.logo = `${BASE_URL}/images/white_logo_transparent_background.png`;
    this.sameAs = ['https://www.facebook.com/roomhereapp', 'https://twitter.com/roomhere'];
    this.contactPoint = new RoomhereContactPoint();
  }
}

export class BreadCrumbList implements Schema {
  '@type': string = "BreadcrumbList";
  itemListElement: ListItem[]

  constructor(...itemList: ListItem[]) {
    this.itemListElement = itemList;
  }
}

export class ListItem implements Schema {
  '@type': string = "ListItem";
  position: number;
  item: {
    "@id": string,
    name: string,
    image: string,
  }

  constructor({position, id, name, image}: {position: number, id: string, name: string, image: string}) {
    this.position = position;
    this.item = {
      '@id': `${BASE_URL}/${id}`,
      image: `${BASE_URL}/${image}`,
      name: name,
    };
  }
}

// Can't be part of the class, since the whole class gets serialized
const searchActionQueryPlaceholder: string = 'search_term_string';

export abstract class SearchAction implements Schema {
  '@type': string = 'SearchAction';
  'query-input': string;

  target: string;


  constructor(baseUrl: string, path: string) {
    this['query-input'] = `required name=${searchActionQueryPlaceholder}`;
    this.target = `${baseUrl}/${path}${searchActionQueryPlaceholder}`
  }
}

export class RoomhereSearchAction extends SearchAction implements Schema {
  constructor() {
    super(BASE_URL, 'search;q=');
  }
}

export abstract class Website implements Schema {
  '@type': string = 'WebSite';
  url: string;
  author: Organization;
  potentialAction: SearchAction;
}

export class RoomhereWebsite extends Website implements Schema {
  constructor() {
    super()
    this.url = BASE_URL;
    this.potentialAction = new RoomhereSearchAction();
    this.author = new RoomhereOrganization();
  }
}
