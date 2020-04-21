'use strict';

const xml2js = require('xml2js');

module.exports = {
    parseXML(xml) {
        return xml2js.parseStringPromise(xml);
    },
    hasAnyResult(data) {
        return data['are:Pocet_zaznamu'][0] !== '0';
    },
    hasError(data) {
        return data['are:Error'];
    },
    getError(data) {
        return JSON.stringify(data['are:Error']);
    },
    getResponse(data) {
        const obj = {};

        obj.idNumber = data['are:Zaznam'][0]['are:ICO'][0];
        obj.name = data['are:Zaznam'][0]['are:Obchodni_firma'][0];

        const addr = data['are:Zaznam'][0]['are:Identifikace'][0]['are:Adresa_ARES'][0];

        obj.address = {
            street: addr['dtt:Nazev_ulice'][0],
            number: `${addr['dtt:Cislo_domovni'][0]}${addr['dtt:Cislo_orientacni'] ? '/' + addr['dtt:Cislo_orientacni'][0]: ''}`,
            city: addr['dtt:Nazev_obce'][0],
            postNumber: addr['dtt:PSC'][0],
        }

        return obj;
    },
    parse(xml) {
        if (!xml) {
            throw new Error(`CZARES: no response defined`);
        }

        return this.parseXML(xml)
            .then(data => {
                const resp = data['are:Ares_odpovedi']['are:Odpoved'][0];
                // just the first response
                
                // console.log(JSON.stringify(resp));

                // any result?
                if (!this.hasAnyResult(resp)) {
                    return Promise.resolve(undefined);
                }
                // any error?
                if (this.hasError(resp)) {
                    return Promise.reject(this.getError(resp));
                }

                return Promise.resolve(this.getResponse(resp));
            })
            .catch(err => {
                console.error(err);
                throw new Error(err);
            });
    }
};