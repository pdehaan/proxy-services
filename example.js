const {getMetadata, getRecommendations} = require('./index');

getRecommendations()
  .then(getMetadata)
  .then(success)
  .catch(error);

function success(urls) {
  const output = JSON.stringify(urls, null, 2);
  console.log(output); // eslint-disable-line no-console
  return urls;
}

function error(err) {
  console.error(err); // eslint-disable-line no-console
  process.exit(1);
}
