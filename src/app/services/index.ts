import { FacetsService } from './facets.service';
import { GoogleApiService } from './google-api.service';
import { HttpService } from './http.service';
import { ImageUploadService } from './image-upload.service';
import { SeoService } from './seo.service';
import { ServerUnsafeService } from './server-unsafe.service';
import { SocialService } from './social.service';
import { UtilService } from './util.service';
import { ValidationService } from './validation.service';

export let ALL_SERVICES = [
  FacetsService,
  GoogleApiService,
  HttpService,
  ImageUploadService,
  SeoService,
  ServerUnsafeService,
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
  ServerUnsafeService: ServerUnsafeService,
  SocialService: SocialService,
  UtilService: UtilService,
  ValidationService: ValidationService,
};
