# proxy-services

Shim for using the recommendation API, Embedly proxy, and Fathom proxy.

## Requires:

- Node 6 w/ npm 3

## Installation:

This package isn't in npm, so you'll need to install it directly from GitHub:

```sh
$ npm i pdehaan/proxy-services -S
```

## Usage:

```js
const {getMetadata, getRecommendations} = require('proxy-services');

getRecommendations()
  .then(getMetadata)
  .then(success)
  .catch(error);

function success(urls) {
  const output = JSON.stringify(urls, null, 2);
  console.log(output);
}

function error(err) {
  console.error(err);
  process.exit(1);
}
```
