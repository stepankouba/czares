'use strict';

const chai = require('chai');
const expect = chai.expect;
const CZAres = require('../index.js');

describe('Ares SDK basic functions', () => {
    it('Ares object created', () => {
        const ares = new CZAres();
        expect(ares).to.exist;
    });

    it('Get by Identification Number - large company', done => {
        const ares = new CZAres();

        ares.getByIdentificationNumber('45244782')
            .then(data => {
                expect(data).to.have.property('idNumber');
                expect(data.idNumber).equals('45244782');
                expect(data.isVAT).to.be.true;
                expect(data).to.have.property('taxIdNumber');
                done();
            }).catch(err => {
                console.error(err);
                done();
            });
    });

    it('Get by Identification Number - freelancer', done => {
        const ares = new CZAres();

        ares.getByIdentificationNumber('71700650')
            .then(data => {
                expect(data).to.have.property('idNumber');
                expect(data.idNumber).equals('71700650');
                expect(data.isVAT).to.be.false;
                expect(data).to.have.property('taxIdNumber');
                done();
            }).catch(err => {
                console.error(err);
                done();
            });
    });

    it('Is VAT registered - freelancer', done => {
        const ares = new CZAres();

        ares.isVATRegistered('71700650')
            .then(data => {
                expect(data).to.be.false;
                done();
            }).catch(err => {
                console.error(err);
                done();
            });
    });

    it('Is VAT registered - company', done => {
        const ares = new CZAres();

        ares.isVATRegistered('45244782')
            .then(data => {
                expect(data).to.be.true;
                done();
            }).catch(err => {
                console.error(err);
                done();
            });
    });
});