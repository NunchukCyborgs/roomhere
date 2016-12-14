# Roomhere

## Installation

* Log in to Telerik Account
``` sh
npm login --registry=https://registry.npm.telerik.com/ --scope=@progress
# username: <whatever>
# email: telerik@roomhere.io
# password: <standard-roomhere-password>
```
* `npm install`

## Development
* run `npm start`, `npm run watch:scss` and `npm run watch` in separate terminals to build your client app, start a web server, and allow file changes to update in realtime.

`npm run watch:scss` will hopefully be built into the main watch command at some point. 

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
