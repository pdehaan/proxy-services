/* eslint-disable no-console */

const { getRecommendations, getMetadata, validateMetadata } = require('./index');

getRecommendations()
  // Only scan a subset of the recommendations.
  // NOTE: Maximum 20 URLs can be passed to Metadata server in a single request.
  // .then((urls) => urls.slice(0, 10))

  // Get Metadata for each Pocket recommendation.
  .then((urls) => getMetadata(urls))
  .then((results) => {
    return Object.keys(results).map((site) => {
      site = results[site];
      // Validate each site's metadata against the default schema and store any errors.
      return validateMetadata(site)
        // Catch and inject any validation errors here so they don't break the
        // `Promise.all()` below.
        .catch(({details}) => {
          site.errors = details;
          return site;
        });
    });
  })
  // Wait for all Promises to resolve...
  .then((promises) => Promise.all(promises))
  // Only return results which have schema errors, for easier debugging.
  .then((results) => results.filter((site) => !!site.errors))
  // Make it pretty, or log the error if the Promise chain was broken.
  .then((results) => console.log(JSON.stringify(results, null, 2)))
  .catch((err) => console.error(err));
