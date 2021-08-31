'use strict';

require('dotenv').config();
const PORT = process.env.PORT;
const io = require('socket.io')(PORT);
const uuid = require('uuid').v4;
const caps = io.of('/caps');

const queue = {
    'acme-widgets': {},
    '1-206-flowers': {},
};


caps.on('connection', socket => {
    socket.on('join', room => {
        console.log('room name: ', room);
        socket.join(room);
    });

    socket.on('received', payload => {

        let storeName = payload.store
        let orderID = payload.orderID
        delete queue[storeName][orderID];
    });

    socket.on('getAll', payload => {

        Object.keys(queue[payload]).forEach((id) => {
            socket.emit('message', { id, payload: queue[payload][id] });

        });
    });

    socket.on('pickup', (payload) => {
        console.log('EVENT:', {
            event: 'pickup',
            time: new Date().toLocaleString(),
            payload: payload,
        });
        caps.emit('pickup', payload);
    });

    socket.on('in-transit', (payload) => {
        console.log('EVENT:', {
            event: 'in-transit',
            time: new Date().toLocaleString(),
            payload: payload,
        });
        caps.to(payload.store).emit('in-transit', payload);
    });

    socket.on('delivered', (payload) => {
        console.log('EVENT:', {
            event: 'delivered',
            time: new Date().toLocaleString(),
            payload: payload,
        });
        let storeName = payload.store
        let orderID = payload.orderID
        queue[storeName][orderID] = { payload };
        caps.to(storeName).emit('delivered', payload);
    });
});