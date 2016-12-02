const Honeybadger = require('honeybadger');
const request = require('request');
const IS_PROD = process.env.NODE_ENV === 'production';

export function honeybadgerConfigure() {
  IS_PROD && Honeybadger.configure({
    apiKey: '8807ffbf',
    environment: process.env.NODE_ENV,
    developmentEnvironments: ['dev', 'development', 'test', 'undefined'],
  });
}

export const honeybadgerBefore = Honeybadger.requestHandler // Use *before* all other app middleware. 
export const honeybadgerAfter = Honeybadger.errorHandler;  // Use *after* all other app middleware.
