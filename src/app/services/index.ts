import { FacetsService } from './facets.service';
import { GoogleApiService } from './google-api.service';
import { HttpService } from './http.service';
import { ImageUploadService } from './image-upload.service';
import { SeoService } from './seo.service';
import { SocialService } from './social.service';
import { UtilService } from './util.service';
import { ValidationService } from './validation.service';

export let ALL_SERVICES = [
  FacetsService,
  GoogleApiService,
  HttpService,
  ImageUploadService,
  SeoService,
  SocialService,
  UtilService,
  ValidationService,
];

export let SERVICES = { 
  FacetsService: FacetsService,
  GoogleApiService: GoogleApiService,
  HttpService: HttpService,
  ImageUploadService: ImageUploadService,
  SeoService: SeoService,
  SocialService: SocialService,
  UtilService: UtilService,
  ValidationService: ValidationService,
};
