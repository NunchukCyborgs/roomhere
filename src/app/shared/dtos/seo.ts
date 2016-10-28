import {Image} from './property';

export interface Tags {
  description: string;
  title: string;
  image: Image
}

export interface Tag {
  property: string;
  content: string;
  element?: any;
}

export interface KVP {
  name: string,
  value: string
}

export class PostalAddress {
  '@type': string = 'PostalAddress';
  addressCountry?: string;
  streetAddress?: string;
  postalCode?: string;
  addressRegion?: string;
  addressLocality?: string;
}

export class GeoCoordinates {
  '@type': string = 'GeoCoordinates';
  latitude: string;
  longitude: string;
}

export class SingleFamilyResidence {
  '@context': string = 'https://schema.org';
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
