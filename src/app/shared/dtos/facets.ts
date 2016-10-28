import { Amenity, Location } from './property';

export class PropertyFacet {
  public min_price: number;
  public max_price: number;
  public min_bedrooms: number;
  public min_bathrooms: number;
  public max_lease_length: number;
  public locations: Location[];
  public amenities: Amenity[];
  public types: string[];

  constructor() {
    this.min_price = 0;
    this.max_price = 25000;
    this.min_bedrooms = 0;
    this.min_bathrooms = .5;
    this.max_lease_length = null;
    this.locations = [];
    this.amenities = [];
    this.types = [];
  }
}
