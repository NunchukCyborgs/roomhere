import { Carousel } from './carousel/component';
import { ControlMessages } from './control-messages/component';
import { ImageUpload } from './image-upload/component';
import { NumberTicker } from './number-ticker/component';
import { PropertyMap } from './property-map/component';
import { Slide } from './slide/component';
import { UploadProgress } from './upload-progress/component';
import { PropertySlider } from './property-slider/component';
import { PropertyFilters } from './property-filters/component';
import { PropertyAccordion } from './property-accordion/component';

export let ALL_COMPONENTS = [
  Carousel, 
  ControlMessages, 
  ImageUpload, 
  NumberTicker, 
  PropertyMap, 
  Slide, 
  UploadProgress,
  PropertySlider,
  PropertyFilters,
  PropertyAccordion,
];

export let COMPONENTS = { 
  Carousel: Carousel, 
  ControlMessages: ControlMessages, 
  ImageUpload: ImageUpload, 
  NumberTicker: NumberTicker, 
  PropertyMap: PropertyMap, 
  Slide: Slide, 
  UploadProgress: UploadProgress,
  PropertySlider: PropertySlider,
  PropertyFilters: PropertyFilters,
  PropertyAccordion: PropertyAccordion,
};
