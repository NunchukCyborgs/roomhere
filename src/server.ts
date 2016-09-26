// the polyfills must be the first thing imported in node.js
import 'angular2-universal-polyfills/node';

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

// Angular 2
import { enableProdMode } from '@angular/core';
import { createEngine } from 'angular2-express-engine';
import { PrebootOptions } from 'preboot';

enableProdMode();

const app = express();
app.use(require('serve-favicon')(__dirname + '/assets/images/favicon.ico'));
const ROOT = path.join(path.resolve(__dirname, '..'));

// Express View
import { MainModule } from './main.node';
app.engine('.html', createEngine({}));
app.set('views', __dirname);
app.set('view engine', 'html');


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

// Serve static files
app.use('/', express.static(path.join(__dirname, 'assets'), { maxAge: 30 }));
app.use(express.static(path.join(ROOT, 'dist/client'), { index: false }));

const options: PrebootOptions = { appRoot: ['app'], uglify: true, buffer: true };

function ngApp(req, res) {
  res.render('index', {
    req,
    res,
    ngModule: MainModule,
    preboot: options,
    baseUrl: '/',
    requestUrl: req.originalUrl,
    originUrl: req.hostname,
  });
}

// Routes with html5pushstate
// ensure routes match client-side-app
app.get('/', ngApp);
app.get('/faq', ngApp);
app.get('/privacy-policy', ngApp);
app.get('/settings', ngApp);
app.get('/properties/*', ngApp);

app.get('*', function (req, res) {
  res.status(404);

  if (req.accepts('html')) {
    ngApp(req, res);
  } else if (req.accepts('json')) {
    res.setHeader('Content-Type', 'application/json');
    res.send({ error: 'Not found' });
  } else {
    res.type('txt').send('Not found');
  }

});

// Server
let server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on: http://localhost:${server.address().port}`);
});
