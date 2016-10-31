# Roomhere

## Installation

* `npm install`

## Development
* run `npm start` and `npm run watch` in two separate terminals to build your client app, start a web server, and allow file changes to update in realtime

## Production

* `npm start` to build your client app and start a web server
* `npm run build:prod` to prepare a distributable bundle


## Console Commands

* Log in to API Console
``` sh
cd /var/www/apartment_search/current/

# Staging
RACK_ENV=staging rails c

# Production
RACK_ENV=production rails c
```
