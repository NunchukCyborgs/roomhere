// the polyfills must be one of the first things imported in node.js.
// The only modules to be imported higher - node modules with es6-promise 3.x or other Promise polyfill dependency
// (rule of thumb: do it if you have zone.js exception that it has been overwritten)
// if you are including modules that modify Promise, such as NewRelic,, you must include them before polyfills
import 'angular2-universal-polyfills';
import 'ts-helpers';
import './___workaround.node'; // temporary until 2.1.1 things are patched in Core

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

// Angular 2
import { enableProdMode } from '@angular/core';
// Angular 2 Universal
import { createEngine } from 'angular2-express-engine';

// App
import { MainModule } from './app/app.node.module';

// enable prod for faster renders
enableProdMode();



// CUSTOM
  import { PrebootOptions } from 'preboot';
  import { DEFAULT_TENANT } from './app/config';

  const Honeybadger = require('honeybadger');
  const request = require('request');
  const IS_PROD = process.env.NODE_ENV === 'production';

  IS_PROD && Honeybadger.configure({
    apiKey: '8807ffbf',
    environment: process.env.NODE_ENV,
    developmentEnvironments: ['dev', 'development', 'test', 'undefined'],
  });

// END CUSTOM


const app = express();
IS_PROD && app.use(Honeybadger.requestHandler); // Use *before* all other app middleware.
app.use(require('serve-favicon')(__dirname + '/assets/images/favicon.ico'));
const ROOT = path.join(path.resolve(__dirname, '..'));

// Express View
app.engine('.html', createEngine({
  ngModule: MainModule,
  providers: [
    // use only if you have shared state between users
    // { provide: 'LRU', useFactory: () => new LRU(10) }

    // stateless providers only since it's shared
  ]
}));
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname);
app.set('view engine', 'html');

// CUSTOM
  app.use(require('express-minify-html')({
    override: true,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true
    }
  }));

app.use(cookieParser('Angular 2 Universal'));
app.use(bodyParser.json());

// CUSTOM
  IS_PROD && app.use(Honeybadger.errorHandler);  // Use *after* all other app middleware.


// CUSTOM
  app.use('/', express.static(path.join(__dirname, 'assets'), { maxAge: 30 }));
  app.use(express.static(path.join(ROOT, 'dist/client'), { index: false }));

// CUSTOM 
export const options: PrebootOptions = { appRoot: ['app'], uglify: true, buffer: true };

  function ngApp(req, res) {
    res.render('index', {
      // time: true, // use this to determine what part of your app is slow only in development
      req,
      res,
      ngModule: MainModule,
      preboot: options,
      baseUrl: '/',
      requestUrl: req.originalUrl,
      originUrl: req.hostname,
    });
  }

  function propertiesRoute(req, res) {
    request.head(`https://api.roomhere.io/${req.url.replace(`${DEFAULT_TENANT}/`, 'properties/')}`, function (error, response, body) {
      response.statusCode == 404 ? missingResource(req, res) : ngApp(req, res)
    });
  }

  function missingResource(req, res) {
    res.status(404);

    if (req.accepts('html')) {
      ngApp(req, res);
    } else if (req.accepts('json')) {
      res.setHeader('Content-Type', 'application/json');
      res.send({ error: 'Not found' });
    } else {
      res.type('txt').send('Not found');
    }
  }

  // Routes with html5pushstate
  // ensure routes match client-side-app
  app.get('/', ngApp);
  app.get('/search*', ngApp);
  app.get('/faq', ngApp);
  app.get('/privacy-policy', ngApp);
  app.get('/reset-password', ngApp);
  app.get('/account/', ngApp);
  app.get('/account/*', ngApp);
  app.get(`/${DEFAULT_TENANT}/*`, propertiesRoute);

  app.get('*', missingResource);

// END CUSTOM

// Server
let server = app.listen(app.get('port'), () => {
  console.log(`Listening on: http://localhost:${server.address().port}`);
});

