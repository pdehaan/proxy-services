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

See [example.js](example.js) for example:

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

## API

### `proxies`:Object

Returns an Object with the following properties:

- `embedly`:String &mdash; URI to Embed.ly proxy extract endpoint.
- `metadata`:String &mdash; URI to Fathom proxy metadata endpoint.
- `recommendations`:String &mdash; URI to Pocket recommendations endpoint.

### `getEmbedly(urls:Array)`:Promise

Returns a promise which resolves with an Object of parsed URIs (or rejects with an error).

#### Parameters:

An Array of URIs to pass to the Embedly Proxy service.

#### Sample response:

```js
{
  "http://arstechnica.com/security/2016/08/researchers-crack-open-unusually-advanced-malware-that-hid-for-5-years/": {
    "app_links": [],
    "authors": [
      {
        "name": "Dan Goodin",
        "url": "http://arstechnica.com/author/dan-goodin/"
      },
      ...
    ],
    "cache_age": 86400,
    "content": "<div>...</div>",
    "description": "...",
    "embeds": [],
    "entities": [
      {
        "count": 3,
        "name": "Sauron"
      },
      ...
    ],
    "favicon_colors": [
      {
        "color": [249, 105, 43],
        "weight": 0.8208007812
      },
      ...
    ],
    "favicon_url": "https://cdn.arstechnica.net/favicon.ico",
    "images": [
      {
        "caption": null,
        "colors": [
          {
            "color": [0, 12, 133],
            "weight": 0.9448242188
          },
          ...
        ],
        "entropy": 0.969153817,
        "height": 236,
        "size": 42096,
        "url": "http://cdn.arstechnica.net/wp-content/uploads/2016/08/project-sauron-640x236.png",
        "width": 640
      }
    ],
    "keywords": [
      {
        "name": "projectsauron",
        "score": 70
      },
      ...
    ],
    "language": "English",
    "lead": null,
    "media": {},
    "offset": null,
    "original_url": "http://arstechnica.com/security/2016/08/researchers-crack-open-unusually-advanced-malware-that-hid-for-5-years/",
    "provider_display": "arstechnica.com",
    "provider_name": "Ars Technica",
    "provider_url": "http://arstechnica.com",
    "published": 1470703318000,
    "related": [
      {
        "description": "An attack aiming to infect PoS systems was found using the Angler Exploit Kit to push a PoS reconnaissance Trojan,This Trojan, detected as TROJ_RECOLOAD.A, checks for multiple conditions in the infected system like if it is a PoS machine or part of a PoS network. It then proceeds to download specific malware depending on the...",
        "thumbnail_height": 240,
        "thumbnail_url": "http://blog.trendmicro.com/trendlabs-security-intelligence/files/2015/07/angler-ek-pos1.png",
        "thumbnail_width": 450,
        "title": "Angler Exploit Kit Used to Find and Infect PoS Systems - TrendLabs Security Intelligence Blog"
      },
      ...
    ],
    "safe": true,
    "title": "Researchers crack open unusually advanced malware that hid for 5 years",
    "type": "html",
    "url": "http://arstechnica.com/security/2016/08/researchers-crack-open-unusually-advanced-malware-that-hid-for-5-years/"
  }
}
```

### `getMetadata(urls:Array)`:Promise

Returns a promise which resolves with an Object of parsed URIs (or rejects with an error).

#### Parameters:

An Array of URIs to pass to the Fathom Metadata Proxy service.

#### Sample response:

```js
{
  "http://arstechnica.com/security/2016/08/researchers-crack-open-unusually-advanced-malware-that-hid-for-5-years/": {
    "description": "...",
    "favicon_url": "http://cdn.arstechnica.net/wp-content/themes/ars/assets/img/ars-ios-icon-d9a45f558c.png",
    "images": [
      {
        "entropy": 1,
        "height": 500,
        "url": "http://cdn.arstechnica.net/wp-content/uploads/2016/08/project-sauron-640x236.png",
        "width": 500
      }
    ],
    "original_url": "http://arstechnica.com/security/2016/08/researchers-crack-open-unusually-advanced-malware-that-hid-for-5-years/",
    "title": "Researchers crack open unusually advanced malware that hid for 5 years",
    "url": "http://arstechnica.com/security/2016/08/researchers-crack-open-unusually-advanced-malware-that-hid-for-5-years/"
  },
  ...
}
```

### `getRecommendation()`:Promise

Returns a Promise which resolves with an Array of recommended URLs (or rejects with an error).

#### Sample response:

```json
[
  "http://www.digitaltrends.com/web/ways-to-decentralize-the-web/",
  "http://www.nytimes.com/2016/08/11/technology/think-amazons-drone-delivery-idea-is-a-gimmick-think-again.html",
  "http://www.nytimes.com/2016/08/10/technology/facebook-ad-blockers.html",
  "http://www.nytimes.com/2016/08/09/opinion/the-world-loves-refugees-when-theyre-olympians.html",
  "http://www.nytimes.com/2016/08/09/fashion/weddings/bride-is-walked-down-aisle-by-the-man-who-got-her-fathers-donated-heart.html",
  "http://www.inc.com/marcel-schwantes/these-31-life-hacks-can-improve-your-life-in-just-a-month.html",
  "http://greatergood.berkeley.edu/article/item/why_it_doesnt_pay_to_be_a_people_pleaser",
  "http://sethgodin.typepad.com/seths_blog/2016/08/the-two-risk-mistakes.html",
  "http://www.nytimes.com/2016/08/10/arts/the-slow-game-app-is-the-new-smoke-break.html",
  "http://www.newyorker.com/news/news-desk/the-defector-who-returned-to-iran",
  "http://www.theverge.com/2016/8/9/12404468/cable-hulu-netflix-amazon-cord-cutting",
  "https://stratechery.com/2016/walmart-and-the-multichannel-trap/",
  "http://www.nytimes.com/2016/08/10/opinion/trumps-ambiguous-wink-wink-to-second-amendment-people.html",
  "http://lifehacker.com/this-map-shows-you-the-best-road-trip-route-between-nat-1784973247",
  "http://www.esquire.com/news-politics/a46918/heroin-mexico-el-chapo-cartels-don-winslow/",
  "http://www.businessinsider.com/bloomberg-beta-head-roy-bahat-on-the-formula-for-ai-2016-8",
  "http://www.rollingstone.com/politics/features/trumps-assassination-dog-whistle-was-scarier-than-you-think-w433615",
  "http://www.thefader.com/2016/08/09/joanne-the-scammer-branden-miller-messy-bitch-interview",
  "https://www.washingtonpost.com/lifestyle/style/how-not-to-respond-to-john-olivers-ode-to-local-newspapers/2016/08/08/c9c92240-5da6-11e6-8e45-477372e89d78_story.html",
  "http://digg.com/2016/bilingual-benefits"
]
```
