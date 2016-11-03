import { Amenity, Location } from './property';

export class PropertyFacet {
  public min_price: number = 0;
  public max_price: number = 25000;
  public min_bedrooms: number = 1;
  public min_bathrooms: number = 1;
  public max_lease_length: number = null;
  public locations: Location[] = [];
  public amenities: Amenity[] = [];
  public types: string[] = [];
  public q: string; // Query. Shortened to 'q' for no good reason.
}
