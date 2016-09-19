// the polyfills must be the first thing imported
import 'angular2-universal-polyfills/browser';

// Angular 2
import { enableProdMode} from '@angular/core';
import { platformUniversalDynamic } from 'angular2-universal';
import { MainModule } from './main.browser';

const platformRef = platformUniversalDynamic();
enableProdMode();

console.log('beginning...');

// on document ready bootstrap Angular 2
document.addEventListener('DOMContentLoaded', () => platformRef
  .bootstrapModule(MainModule)
  .then(() => {
    console.log('done!');

  })
);
