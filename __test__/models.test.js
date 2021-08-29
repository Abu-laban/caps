'use strict';

const events = require('../events');
const supertest = require('supertest');


let payload = {
    store: '1-206-flowers',
    orderID: '4959e85d-1e95-48f9-bbd0-25e588e05b77',
    customer: 'Edgar Barton',
    address: '10808 Gutkowski Heights'
};

jest.useFakeTimers();

describe('caps test', () => {

    it('pickup', () => {
        const caps = require('../src/caps');
        caps.emit('pickup', payload);
        expect(caps.emit('pickup', payload)).toEqual(true);
    });

    it('in-transit', () => {
        const caps = require('../src/caps');
        caps.emit('in-transit', payload);
        expect(caps.emit('in-transit', payload)).toEqual(true);
    });

    it('delivered', () => {
        const caps = require('../src/caps');
        caps.emit('delivered', payload);
        expect(caps.emit('delivered', payload)).toEqual(true);
    });


});


describe('driver test', () => {

    it('pickup', () => {
        const driver = require('../src/models/Drivers/driver');
        driver.emit('pickup', payload);
        expect(driver.emit('pickup', payload)).toEqual(true);
    });

});



describe('vendor test', () => {
    it('delivered', () => {
        const vendor = require('../src/models/Vendor/vendor');
        vendor.emit('delivered', payload);
        expect(vendor.emit('delivered', payload)).toEqual(true);
    });

});