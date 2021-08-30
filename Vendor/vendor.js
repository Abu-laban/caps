'use strict';

require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');
const host = process.env.HOST;
const connectionToCaps = io.connect(`${host}/caps`);

setInterval(() => {
    let customerOrder = {
        store: process.env.STORE || 'Tariq',
        orderID: faker.datatype.uuid(),
        customer: faker.name.findName(),
        address: faker.address.streetAddress(),
    };
    connectionToCaps.emit('pickup', customerOrder);
}, 5000);

connectionToCaps.on('delivered', payload => {

    console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
});

module.exports = connectionToCaps