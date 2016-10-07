const webpack = require('webpack');
const path = require('path');
const resolveNgRoute = require('@angularclass/resolve-angular-routes');
const autoprefixer = require('autoprefixer');
const purify = require('purifycss-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin')
const extractCritical = new ExtractPlugin('critical.css');
const extractDeferred = new ExtractPlugin('deferred.css');

const BASE_API_URL = process.env.NODE_ENV !== 'development' ? 'https://api.roomhere.io' : 'https://test-api.roomhere.io';
const BASE_URL = process.env.NODE_ENV !== 'development' ? 'https://roomhere.io' : 'http://localhost:3000';

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

const commonConfig = {
  resolve: {
    extensions: ['', '.ts', '.js', '.json']
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
    new webpack.DefinePlugin({
      BASE_API_URL: JSON.stringify(BASE_API_URL),
      BASE_URL: JSON.stringify(BASE_URL),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
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
        whitelist: ['tooltip', 'foundation-mq'],
      }
    }),
  ]
};

var clientConfig = {
  target: 'web',
  entry: './src/client',
  output: {
    path: root('dist/client')
  },
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  }
};

var serverConfig = {
  target: 'node',
  entry: './src/server', // use the entry file of the node server if everything is ts rather than es5
  output: {
    path: root('dist/server'),
    libraryTarget: 'commonjs2'
  },
  externals: checkNodeImport,
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};

// Default config
var defaultConfig = {
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    root: root('/src')
  },
  output: {
    publicPath: path.resolve(__dirname),
    filename: 'index.js'
  }
}

var webpackMerge = require('webpack-merge');
module.exports = [
  // Client
  webpackMerge({}, defaultConfig, commonConfig, clientConfig),

  // Server
  webpackMerge({}, defaultConfig, commonConfig, serverConfig)
]

// Helpers
function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request); return;
  }
  cb();
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
