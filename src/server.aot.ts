// the polyfills must be one of the first things imported in node.js.
// The only modules to be imported higher - node modules with es6-promise 3.x or other Promise polyfill dependency
// (rule of thumb: do it if you have zone.js exception that it has been overwritten)
// if you are including modules that modify Promise, such as NewRelic,, you must include them before polyfills
import 'angular2-universal-polyfills';
import 'ts-helpers';
import './__workaround.node'; // temporary until 2.1.1 things are patched in Core

import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mcache from 'memory-cache';

const { gzipSync } = require('zlib');
const accepts = require('accepts');
// const { compressSync } = require('iltorb');
const interceptor = require('express-interceptor');

// Angular 2
import { enableProdMode } from '@angular/core';
// Angular 2 Universal
import { createEngine } from 'angular2-express-engine';

// App
import { MainModuleNgFactory } from './node.module.ngfactory';

import { serveStaticFiles, watchRoutes, setOptions, useMiddlewears } from './server-config';
import { honeybadgerConfigure, honeybadgerBefore, honeybadgerAfter } from './honeybadger';

// enable prod for faster renders
enableProdMode();

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));

// Express View
app.engine('.html', createEngine({
  precompile: false, // this needs to be false when using ngFactory
  ngModule: MainModuleNgFactory,
  providers: [
    // use only if you have shared state between users
    // { provide: 'LRU', useFactory: () => new LRU(10) }

    // stateless providers only since it's shared
  ]
}));

setOptions.call(this, app);

honeybadgerConfigure.call(this);

app.use(honeybadgerBefore);
useMiddlewears.call(this, app);
// app.use(interceptor((req, res)=>({
//   // don't compress responses with this request header 
//   isInterceptable: () => (!req.headers['x-no-compression']),
//   intercept: ( body, send ) => {
//     const encodings  = new Set(accepts(req).encodings());
//     const bodyBuffer = new Buffer(body);
//     // url specific key for response cache
//     const key = '__response__' + req.originalUrl || req.url;
//     let output = bodyBuffer;
//     // check if cache exists
//     if (mcache.get(key) === null) {
//       // check for encoding support
//       if (encodings.has('br')) {
//         // brotli
//         res.setHeader('Content-Encoding', 'br');
//         output = compressSync(bodyBuffer);
//         mcache.put(key, {output, encoding: 'br'});
//       } else if (encodings.has('gzip')) {
//         // gzip
//         res.setHeader('Content-Encoding', 'gzip');
//         output = gzipSync(bodyBuffer);
//         mcache.put(key, {output, encoding: 'gzip'});
//       }
//     } else {
//       const { output, encoding } = mcache.get(key);
//       res.setHeader('Content-Encoding', encoding);
//       send(output);
//     }
//     send(output);
//   }
// })));

app.use(honeybadgerAfter);

const accessLogStream = fs.createWriteStream(ROOT + '/morgan.log', {flags: 'a'})

app.use(morgan('common', {
  skip: (req, res) => res.statusCode < 400,
  stream: accessLogStream
}));

serveStaticFiles.call(this, app, express, path, ROOT);
watchRoutes.call(this, app);

// Server
let server = app.listen(app.get('port'), () => {
  console.log(`Listening on: http://localhost:${server.address().port}`);
});
