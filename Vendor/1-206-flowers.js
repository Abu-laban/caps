'use strict';

require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');
const host = process.env.HOST;
const connectionToCaps = io.connect(`${host}/caps`);

const store = '1-206-flowers';

connectionToCaps.emit('join', store);

connectionToCaps.emit('getAll', store)

connectionToCaps.on('message', msg => {
    console.log('messages: ', msg.payload.payload)
    connectionToCaps.emit('received', msg.payload.payload)
})

connectionToCaps.on('delivered', payload => {

    console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
});

connectionToCaps.on("delivered", msg => {
    connectionToCaps.emit('received', msg)
})

module.exports = connectionToCaps