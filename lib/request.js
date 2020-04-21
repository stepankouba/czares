'use strict';

const fetch = require('node-fetch');
const response = require('./response');

const ARES_URL = require('./config');

module.exports = {
    createUrl(service, params) {
        if (!ARES_URL[service]) {
            throw new Error(`CZARES: service ${service} does not exist on ARES API`);
        }

        return `${ARES_URL[service]}?${new URLSearchParams(params)}`;
    },
    get(params) {
        const url = this.createUrl('standard', params);

        return fetch(url)
            .then(res => res.text())
            .then(xml => response.parse(xml))
            .catch(err => {
                throw new Error(err);
            });
    }
};