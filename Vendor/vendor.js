'use strict';

require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');
const host = process.env.HOST;
const connectionToCaps = io.connect(`${host}/caps`);

const store = process.argv.splice(2)[0]

connectionToCaps.emit('join', store);

connectionToCaps.emit('getAll')

connectionToCaps.on('message', msg => {
    console.log('messages: ', msg.payload)
    connectionToCaps.emit('received', msg)
})

connectionToCaps.on('delivered', payload => {

    console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
});

module.exports = connectionToCaps