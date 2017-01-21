import { Amenity, Location } from './property';

export const DEFAULT_MIN_PRICE = 0;
export const DEFAULT_MAX_PRICE = 25000;

export class PropertyFacet {
  public min_price: number = DEFAULT_MIN_PRICE;
  public max_price: number = DEFAULT_MAX_PRICE;
  public min_bedrooms: number = 0;
  public min_bathrooms: number = 0;
  public max_lease_length: number = null;
  public locations: Location[] = [];
  public amenities: Amenity[] = [];
  public types: string[] = [];
}
