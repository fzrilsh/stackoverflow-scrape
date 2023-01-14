# stackoverflow-scrape
Query a question and find the answer on stackoverflow

## Table of Contents

- [stackoverflow-scrape](#stackoverflow-scrape)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [For Node.js](#for-nodejs)

## Usage

#### For Node.js

Install using:

```shell
npm install stackoverflow-scrape --save
```

### WARNING

this module require nodejs ver ^18.11.0

```javascript
var overflow = require("stackoverflow-scrape");

(async() => {
    const fetchForum = await overflow("scraping with jsdom")
    console.log(fetchForum)
})()
```