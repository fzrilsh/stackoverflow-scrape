# stackoverflow-scrape
Query a question and find the answer on stackoverflow

## Table of Contents

- [stackoverflow-scrape](#stackoverflow-scrape)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
      - [For Node.js](#for-nodejs)
    - [WARNING](#warning)
  - [Todo](#todo)

## Usage

#### For Node.js

Install using:

```shell
npm install stackoverflow-scrape --save
```

### WARNING

this module require nodejs ver ^18.11.0

```javascript
var stackoverflow = require("stackoverflow-scrape");

(async() => {
    const fetchForum = await stackoverflow("scraping with jsdom")

    // Or You can use Stackoverflow Link
    // With the url can speed up getting answers
    const fetchForum = await stackoverflow("https://stackoverflow.com/questions/25445936/node-js-web-scraping-with-jsdom")

    console.log(fetchForum)
})()
```

## Todo
- Make Array for Multiple Question and Answer