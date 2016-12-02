var webpack = require('webpack');
var path = require('path');
var clone = require('js.clone');
var webpackMerge = require('webpack-merge');

const autoprefixer = require('autoprefixer');

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

const sassQuery = {
  // includePaths: [path.resolve(__dirname, 'node_modules/foundation-sites/scss'), path.resolve(__dirname, 'node_modules/motion-ui/src')]
  includePaths: ['node_modules/foundation-sites/scss', 'node_modules/motion-ui/src']
  
};
// , 
const sassLoaders = [
  'css-loader?minimize-autoprefixer', 'postcss-loader', 
  { loader: 'sass-loader', query: JSON.stringify(sassQuery) },
];

export var commonPlugins = [
  new webpack.DefinePlugin({
      IS_PROD: IS_PROD,
      BASE_API_URL: JSON.stringify(BASE_API_URL),
      BASE_URL: JSON.stringify(BASE_URL),
      DEFAULT_TENANT: JSON.stringify('cape-girardeau'),
      DEFAULT_TENANT_PRETTY: JSON.stringify('Cape Girardeau'),
      DEFAULT_STATE: JSON.stringify('MO'),
      CAPE_GIRARDEU_CENTER: JSON.stringify({latitude: 37.3067429, longitude: -89.5286194}),
    }),

  new webpack.ContextReplacementPlugin(
    // The (\\|\/) piece accounts for path separators in *nix and Windows
    /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
    root('./src'),
    {
      // your Angular Async Route paths relative to this root directory
    }
  ),

  new webpack.LoaderOptionsPlugin({
  }),
];
export var commonConfig = {
  // https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [ root('node_modules') ]
  },
  context: __dirname,
  output: {
    publicPath: '',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { test: /\.ts$/, use: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /\.html$/, use: 'html-loader', query: htmlQuery },
      { test: /\.css$/, use: ['raw-loader'] },
      { test: /\.json$/, use: 'json-loader' },
      { test: /\.woff[\?]?.*$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf[\?]?.*$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot[\?]?.*$/, use: 'file-loader' },
      { test: /\.svg[\?]?.*$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml' },
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
    Buffer: false
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
    rules: [
      { test: /@angular(\\|\/)material/, use: "imports-loader?window=>global" }
    ],
  },
  externals: includeClientPackages(
    /@angularclass|@angular|angular2-|ng2-|ng-|@ng-|angular-|@ngrx|ngrx-|@angular2|ionic|@ionic|-angular2|-ng2|-ng/
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
export function includeClientPackages(packages, localModule?: string[]) {
  return function(context, request, cb) {
    if (localModule instanceof RegExp && localModule.test(request)) {
      return cb();
    }
    if (packages instanceof RegExp && packages.test(request)) {
      return cb();
    }
    if (Array.isArray(packages) && packages.indexOf(request) !== -1) {
      return cb();
    }
    if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
      return cb(null, 'commonjs ' + request);
    }
    return cb();
  };
}

export function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
