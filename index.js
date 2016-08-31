const fetch = require('node-fetch');
const sortjson = require('sort-json');

const EMBEDLY_PROXY = 'https://embedly-proxy.services.mozilla.com';
const METADATA_PROXY = 'https://page-metadata-service.stage.mozaws.net';

const EMBEDLY_URI = `${EMBEDLY_PROXY}/v2/extract`;
const METADATA_URI = `${METADATA_PROXY}/v1/metadata`;
const RECOMMENDATIONS_URI = `${EMBEDLY_PROXY}/v2/recommendations`;

module.exports = {
  getEmbedly,
  getMetadata,
  getRecommendations,
  proxies: {
    embedly: EMBEDLY_URI,
    metadata: METADATA_URI,
    recommendations: RECOMMENDATIONS_URI
  }
};

function getRecommendations() {
  return fetchJson(RECOMMENDATIONS_URI)
    .then((urls) => urls.map(({url}) => url));
}

function getEmbedly(urls=[]) {
  return _getService(urls, EMBEDLY_URI);
}

function getMetadata(urls=[]) {
  return _getService(urls, METADATA_URI);
}

function _getService(urls=[], proxy=METADATA_URI) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      urls: Array.isArray(urls) ? urls : [urls]
    })
  };
  return fetchJson(proxy, options)
    .then((urls) => sortjson(urls));
}

function fetchJson(uri, options={}) {
  return fetch(uri, options)
    .then((res) => res.json())
    .then(({error, urls}) => {
      // Throw an Error if the proxy returns an `error` string.
      // NOTE: Always `catch()` your Promise chains.
      if (error) {
        throw new Error(error);
      }
      return urls;
    });
}
