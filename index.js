const fetch = require('node-fetch');
const Joi = require('joi');
const promisify = require('es6-promisify');
const sortjson = require('sort-json');
const joiValidate = promisify(Joi.validate);

const EMBEDLY_PROXY = 'https://embedly-proxy.services.mozilla.com';
const METADATA_PROXY = 'https://page-metadata.services.mozilla.com';

const EMBEDLY_URI = `${EMBEDLY_PROXY}/v2/extract`;
const METADATA_URI = `${METADATA_PROXY}/v1/metadata`;
const RECOMMENDATIONS_URI = `${EMBEDLY_PROXY}/v2/recommendations`;

const metadataSchema = Joi.object().keys({
  description: Joi.string().required(),
  favicon_url: Joi.string().uri().required(),
  images: Joi.array().min(1).required(),
  original_url: Joi.string().uri().required(),
  title: Joi.string().required(),
  url: Joi.string().uri().required()
});

function validateMetadata(site, schema, options) {
  schema = schema || metadataSchema;
  options = options || {abortEarly: false, allowUnknown: false};
  return joiValidate(site, schema, options);
}

module.exports = {
  getEmbedly,
  getMetadata,
  getRecommendations,
  metadataSchema,
  validateMetadata,
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
