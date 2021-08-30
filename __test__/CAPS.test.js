'use strict';

const caps = require('../CAPS/caps.js');

let payload = {
    storeId: '1-206-flowers',
    orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
    customer: 'Jamal Braun',
    address: 'Schmittfort, LA'
};

describe('testing event handlers', () => {
    let consoleSpy;

    beforeAll(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    it('pickup Work', async () => {
        caps.emit('pickup', payload);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    });

    it('in-transit  Work ', async () => {
        caps.emit('in-transit', payload);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    });

    it('delivered  Work  ', async () => {
        caps.emit('delivered', payload);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    });

    describe('caps test', () => {

        it('pickup', () => {
            const caps = require('../CAPS/caps');
            caps.emit('pickup', payload);
            expect(caps.emit('pickup', payload)).toEqual(true);
        });

        it('in-transit', () => {
            const caps = require('../CAPS/caps');
            caps.emit('in-transit', payload);
            expect(caps.emit('in-transit', payload)).toEqual(true);
        });

        it('delivered', () => {
            const caps = require('../CAPS/caps');
            caps.emit('delivered', payload);
            expect(caps.emit('delivered', payload)).toEqual(true);
        });


    });

    describe('driver test', () => {

        it('pickup', async () => {
            const driver = require('../Driver/driver');
            driver.emit('pickup', payload);
            await consoleSpy();
            expect(consoleSpy).toHaveBeenCalled();
        });

    });



    describe('vendor test', () => {
        it('delivered', async () => {
            const vendor = require('../Vendor/vendor');
            vendor.emit('delivered', payload);
            await consoleSpy();
            expect(consoleSpy).toHaveBeenCalled();
        });

    });
    afterAll(async () => {
        consoleSpy.mockRestore();

    });

});




