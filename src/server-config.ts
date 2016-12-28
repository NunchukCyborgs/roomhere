/**
 * Server-side routes. Only the listed routes support html5pushstate.
 * Has to match client side routes.
 *
 * Index (/) route does not have to be listed here.
 *
 * @example
 * export const routes: string[] = [
 * 'home', 'about'
 * ];
 **/
export const routes: string[] = [
  'account',
  'pay-rent',
  'p', // General Module
];

import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
const request = require('request');

function cacheControl(req, res, next) {
  // instruct browser to revalidate in 60 seconds
  res.header('Cache-Control', 'max-age=60');
  next();
}

export function serveStaticFiles(app, express, path, ROOT) {
  // Serve static files
  app.use('/', cacheControl, express.static(path.join(__dirname, 'assets'), {maxAge: 30}));
  app.use(cacheControl, express.static(path.join(ROOT, 'dist/client'), {index: false}));
}

// export const prebootOptions: PrebootOptions = { appRoot: ['app'], uglify: true, buffer: true }; // todo

function ngApp(req, res) {
  res.render('index', {
    req,
    res,
    // time: true, // use this to determine what part of your app is slow only in development
    preboot: false,
    baseUrl: '/',
    requestUrl: req.originalUrl,
    originUrl: `https://roomhere.io`,
  });
}

function propertiesRoute(req, res) {
  request.head(`https://api.roomhere.io/properties/${req.params.slug}`, function (error, response, body) {
    response.statusCode == 404 ? missingResource(req, res) : ngApp(req, res);
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

export function watchRoutes(app) {
  app.get('/', ngApp);
  app.get('/cape-girardeau/:slug', propertiesRoute);
  app.get('/pay-rent/:slug', propertiesRoute);

  routes.forEach(route => {
    app.get(`/${route}`, ngApp);
    app.get(`/${route}/*`, ngApp);
  });

  app.get('*', missingResource);
}

export function setOptions(app) {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname);
  app.set('view engine', 'html');
  app.set('json spaces', 2);
}

export function useMiddlewears(app) {
  app.use(require('serve-favicon')(__dirname + '/assets/images/favicon.ico'));
  app.use(cookieParser('Angular 2 Universal'));
  app.use(bodyParser.json());

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
}



