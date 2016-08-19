// Angular 2 Universal
import { bootstrap } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

// Application
import { App } from './app/app.component';
import { routes } from './app/app.routes';
import { PropertyService } from './app/properties/property.service';

// you must return bootstrap for client.ts
export function ngApp() {
  return bootstrap(App, [
    ...HTTP_PROVIDERS,
    provideRouter(routes),
    PropertyService,  
    disableDeprecatedForms(),
    provideForms()
  ]);
}
