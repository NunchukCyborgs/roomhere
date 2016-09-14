import { PropertyImages } from './property-images/component';
import { PropertyReviews } from './property-reviews/component';
import { SimilarProperties } from './similar-properties/component';
import { PropertyPreview } from './property-preview/component'
import { PropertyAmenities } from './property-amenities/component';
import { PropertyActionsGroup } from './property-actions-group/component';
import { PropertyEditImage } from './property-edit-image/component';
import { PropertyEdit } from './property-edit/component';
import { PropertyView } from './property-view/component';

export { Amenity } from '../services/facets.service';
export { Property, PropertyFacet } from './property';
export { PropertyService } from './property.service';
export { PropertyActionStateService, PropertyActionState, PropertyActionMode } from './property-action-state.service';
export { PropertyImages } from './property-images/component';
export { PropertyReviews } from './property-reviews/component';
export { SimilarProperties } from './similar-properties/component';
export { PropertyPreview } from './property-preview/component'
export { PropertyAmenities } from './property-amenities/component';
export { PropertyActionsGroup } from './property-actions-group/component';
export { PropertyEditImage } from './property-edit-image/component';
export { PropertyEdit } from './property-edit/component';
export { PropertyView } from './property-view/component';

export let ALL_COMPONENTS = [
  PropertyImages,
  PropertyReviews,
  SimilarProperties,
  PropertyPreview,
  PropertyAmenities,
  PropertyActionsGroup,
  PropertyEditImage,
  PropertyEdit,
  PropertyView,
];

export let COMPONENTS = { 
  PropertyImages: PropertyImages,
  PropertyReviews: PropertyReviews,
  SimilarProperties: SimilarProperties,
  PropertyPreview: PropertyPreview,
  PropertyAmenities: PropertyAmenities,
  PropertyActionsGroup: PropertyActionsGroup,
  PropertyEditImage: PropertyEditImage,
  PropertyEdit: PropertyEdit,
  PropertyView: PropertyView,
};
