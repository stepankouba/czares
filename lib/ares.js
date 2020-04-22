'use strict';

const request = require('./request');
const requestES = require('./requestES');

class CZAres {
    version = '0.1.0';
    /**
     * Get standard information from Ares by ICO - Company identification number
     * 
     * @param {string} ico - identification number 
     */
    getByIdentificationNumber(ico) {
        let data;
        return request.get({ico})
            .then(resp => {
                data = resp;

                if (data) {
                    return requestES.get({ico})
                        .then(resp => {
                            data.isVAT = resp.isVAT;
                            data.taxIdNumber = resp.taxIdNumber;
            
                            return Promise.resolve(data);
                        });
                } else {
                    return Promise.resolve(data);
                }
            });
    }

    getTaxIdNumber(ico) {
        return requestES.get({ico})
            .then(resp => Promise.resolve(resp.TaxIdNumber));
    }

    isVATRegistered(ico) {
        return requestES.get({ico})
            .then(resp => Promise.resolve(resp.isVAT));
    }
};

module.exports = CZAres;