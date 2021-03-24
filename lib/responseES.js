'use strict';

const xml2js = require('xml2js');

module.exports = {
    parseXML(xml) {
        return xml2js.parseStringPromise(xml);
    },
    hasAnyResult(data) {
        return data['dtt:Pocet_zaznamu'][0] !== '0';
    },
    hasError(data) {
        return data['are:Error'];
    },
    getError(data) {
        return JSON.stringify(data['are:Error']);
    },
    getResponse(data) {
        const obj = {};

        obj.idNumber = data['dtt:V'][0]['dtt:S'][0]['dtt:ico'][0];
        obj.name = data['dtt:V'][0]['dtt:S'][0]['dtt:ojm'][0];
        obj.addressSimple = data['dtt:V'][0]['dtt:S'][0]['dtt:jmn'][0];

        if (data['dtt:V'][0]['dtt:S'][0]['dtt:dph']) { // there is no dtt:dph object
            const vat = data['dtt:V'][0]['dtt:S'][0]['dtt:dph'][0];
            obj.isVAT = vat === '1' || vat === '3';

            const taxId = data['dtt:V'][0]['dtt:S'][0]['dtt:p_dph'][0];
            obj.taxIdNumber = taxId.substring(4);

        } else {
            obj.isVAT = false
            obj.taxIdNumber = "";
        }

        return obj;
    },
    parse(xml) {
        if (!xml) {
            throw new Error(`CZARES: no response defined`);
        }

        return this.parseXML(xml)
            .then(data => {
                // console.log(JSON.stringify(data));
                const resp = data['are:Ares_odpovedi']['are:Odpoved'][0];
                
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
