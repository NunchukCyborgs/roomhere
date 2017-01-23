import { Amenity } from './property';

export class PropertyFacet {
  public min_price: number = 0;
  public max_price: number = 0;
  public min_bedrooms: number = 1;
  public min_bathrooms: number = 1;
  public max_lease_length: number = null;
  public locations: string[] = [];
  public amenities: Amenity[] = [];
  public types: string[] = [];
}
