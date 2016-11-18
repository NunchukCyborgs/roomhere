const webpack = require('webpack');
var clone = require('js.clone');
var webpackMerge = require('webpack-merge');
const path = require('path');
const resolveNgRoute = require('@angularclass/resolve-angular-routes');
const autoprefixer = require('autoprefixer');
const purify = require('purifycss-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin')
const extractCritical = new ExtractPlugin('critical.css');
const extractDeferred = new ExtractPlugin('deferred.css');

const IS_PROD = Boolean(process.env.NODE_ENV === 'production');
const BASE_API_URL = IS_PROD ? 'https://api.roomhere.io' : 'https://test-api.roomhere.io';
const BASE_URL = IS_PROD ? 'https://roomhere.io' : 'http://localhost:3000';

const htmlQuery = {
  minimize: true,
  removeAttributeQuotes: false,
  caseSensitive: true,
  // Teach html-minifier about Angular 2 syntax
  customAttrSurround: [
    [/#/, /(?:)/],
    [/\*/, /(?:)/],
    [/\[?\(?/, /(?:)/]
  ],
  customAttrAssign: [/\)?\]?=/]
};

const whitelist = [
  'tooltip', 
  'foundation-mq',
  '#intercom-frame + span',
  'reveal-overlay',

  // Amenity icon shit. Accessed programatically
  'fa fa-paw',
  'fa fa-wheelchair-alt',
  'icon-washer-dryer-2',
  'icon-electricity',
  'icon-gas',
  'icon-tint',
  'fa fa-trash',
  'icon-central-air-alt',
  'fa fa-fire',
  'icon-smoking-allowed',
  'icon-garage-512',
  'icon-lawn-mower',
  'fa fa-television',
  'fa fa-wifi',

  // Topbar dropdown stuff
  'tooltip',
  'foundation-mq',
  'vertical',
  'first-sub',
  'is-dropdown-submenu-parent',
  'opens-left',
  'is-active',
  'submenu',
  'is-dropdown-submenu',
  'js-dropdown-active',
  'is-submenu-item',
  'is-dropdown-submenu-item',
];



export var commonPlugins = [
  new webpack.ContextReplacementPlugin(
    // The (\\|\/) piece accounts for path separators in *nix and Windows
    /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
    root('./src'),
    {
      // your Angular Async Route paths relative to this root directory
    }
  ),

  new webpack.DefinePlugin({
      IS_PROD: IS_PROD,
      BASE_API_URL: JSON.stringify(BASE_API_URL),
      BASE_URL: JSON.stringify(BASE_URL),
    }),
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
      root('./src'),
      resolveNgRoute(root('./src'))
    ),
    new webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {
          includePaths: [path.resolve(__dirname, 'node_modules/foundation-sites/scss'), path.resolve(__dirname, 'node_modules/motion-ui/src')]
        },
        context: '/',
        postcss: [
          autoprefixer
        ],
      }
    }),
    extractCritical,
    extractDeferred,
    new purify({
      basePath: __dirname,
      paths: [
        '**/template.html'
      ],
      resolveExtensions: ['.html'],
      purifyOptions: {
        minify: true,
        // rejected: true,
        info: true,
        whitelist: whitelist,
      }
    }),

];

export var commonConfig = {
  // https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [ root('node_modules') ],
  },
  context: __dirname,
  output: {
    publicPath: path.resolve(__dirname),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /\.html$/, loader: 'html-loader', query: htmlQuery },
      { test: /\.css$/, loaders: ['css-loader?minimize-autoprefixer', 'postcss-loader'] },
      { test: /\.json$/, loader: 'raw-loader' },
      { test: /app\.scss$/, loader: extractCritical.extract(['css-loader?minimize-autoprefixer', 'postcss-loader', 'sass-loader']) },
      { test: /deferred\.scss$/, loader: extractDeferred.extract(['css-loader?minimize-autoprefixer', 'postcss-loader', 'sass-loader']) },
      { test: /styles\.scss$/, loaders: ['css-loader?minimize-autoprefixer', 'postcss-loader', 'sass-loader'] },
      { test: /\.woff[\?]?.*$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf[\?]?.*$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot[\?]?.*$/, loader: 'file-loader' },
      { test: /\.svg[\?]?.*$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
    ],
  },
  plugins: [
    // Use commonPlugins.
  ]

};

// Client.
export var clientPlugins = [

];

export var clientConfig = {
  target: 'web',
  entry: './src/client',
  output: {
    path: root('dist/client')
  },
  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};


// Server.
export var serverPlugins = [

];

export var serverConfig = {
  target: 'node',
  entry: './src/server', // use the entry file of the node server if everything is ts rather than es5
  output: {
    filename: 'index.js',
    path: root('dist/server'),
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      { test: /@angular(\\|\/)material/, loader: "imports-loader?window=>global" }
    ],
  },
  externals: includeClientPackages(
    /@angularclass|@angular|angular2-|ng2-|ng-|@ng-|angular-|@ngrx|ngrx-|@angular2|ionic|-angular2|-ng2|-ng/
  ),
  node: {
    global: true,
    crypto: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};

export default [
  // Client
  webpackMerge(clone(commonConfig), clientConfig, { plugins: clientPlugins.concat(commonPlugins) }),

  // Server
  webpackMerge(clone(commonConfig), serverConfig, { plugins: serverPlugins.concat(commonPlugins) })
];




// Helpers

export function includeClientPackages(packages) {
  return function(context, request, cb) {
    if (packages) {
      if (packages instanceof RegExp && packages.test(request)) {
        return cb();
      } else if (typeof packages === 'string' && packages.indexOf(request) !== -1) {
        return cb();
      }
    }
    return checkNodeImport(context, request, cb);
  };
}

export function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request); return;
  }
  cb();
}

export function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
