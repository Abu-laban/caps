'use strict';

require('dotenv').config();
const faker = require('faker');
const events = require('../../../events');

setInterval(() => {
    let customerOrder = {
        store: process.env.STORE || 'Tariq',
        orderID: faker.datatype.uuid(),
        customer: faker.name.findName(),
        address: faker.address.streetAddress(),
    };
    events.emit('pickup', customerOrder);
}, 5000);

events.on('delivered', payload => {

    console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
});

module.exports = events;