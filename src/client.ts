// the polyfills must be the first thing imported
import 'angular2-universal-polyfills/browser';

// Angular 2
import { enableProdMode} from '@angular/core';
import { platformUniversalDynamic } from 'angular2-universal';

const platformRef = platformUniversalDynamic();

import { MainModule } from './main.browser';

// on document ready bootstrap Angular 2
document.addEventListener('DOMContentLoaded', () => platformRef.bootstrapModule(MainModule));
