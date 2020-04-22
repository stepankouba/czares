# czares
NodeJS API handler for [ARES](https://wwwinfo.mfcr.cz/ares/ares_xml.html.cz) requests (Czech registry of economic subjects). Please read carefully [security limits and other operations instruction](https://wwwinfo.mfcr.cz/ares/ares_podminky.html.cz). All the documents are in czech language.

## Installation
It's really simple:

`npm install czares --save`

## API Overview and Examples
Let's start with initiation of the class and the object.

```js
const CZAres = require('czares');
const ares = new CZAres();
```

For now, there are available only basic methods for accessing standard information like IČO, DIČ, etc. Before we go deeper into details, have a look at [types definition](https://github.com/stepankouba/czares/blob/master/types/index.d.ts), which gives you great overview.

### Get Basic information about a company by ID Number (IČO)
When you need to get the basic information about company by its ID Number (in czech IČO), just use following code. When nothing is found '''undefined''' is returned:

```js
const CZAres = require('czares');
const ares = new CZAres();
ares.getByIdentificationNumber('COMPANY_ID_NUMBER')
    .then(data => console.log('Company details are:', JSON.stringify(data)))
    .catch(err => console.error(err));
```

### Get information, whether a company is VAT registered
When you need to know whether a freelancer is registered to pay VAT, use this snippet of code:
```js
const CZAres = require('czares');
const ares = new CZAres();
ares.isVATRegistered('71700650')
    .then(isRegistered => console.log('Is Company registered?', isRegistered))
    .catch(err => console.error(err));
```


### Get Tax ID Number ('DIČ')
When you need to know tax ID Number (in czech 'DIČ'), just use this:
```js
const CZAres = require('czares');
const ares = new CZAres();
ares.getTaxIdNumber('COMPANY_ID_NUMBER')
    .then(taxId => console.log('Company tax ID is:', taxId))
    .catch(err => console.error(err));
```

## Development

To run the tests you'll need just:

```bash
$ npm install -g mocha
$ npm install
$ npm run test
```

## Author

Originally developed by [Stepan Kouba](https://github.com/stepankouba). 
