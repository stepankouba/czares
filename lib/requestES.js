'use strict';

const fetch = require('node-fetch');
const responseES = require('./responseES');

const ARES_URL = require('./config');

module.exports = {
    createUrl(service, params) {
        if (!ARES_URL[service]) {
            throw new Error(`CZARES: service ${service} does not exist on ARES API`);
        }

        return `${ARES_URL['economicSubjects']}?${new URLSearchParams(params)}`;
    },
    get(params) {
        const url = this.createUrl('economicSubjects', params);

        return fetch(url)
            .then(res => res.text())
            .then(xml => responseES.parse(xml))
            .catch(err => {
                console.error(err);
                throw new Error(err);
            });
    }
};