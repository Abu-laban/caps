'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const io = require('socket.io')(PORT);
const caps = io.of('/caps');


caps.on('connection', (socket) => {

    //pickup

    socket.on('pickup', payload => {
        console.log('EVENT:', {
            event: 'pickup',
            time: new Date().toLocaleString(),
            payload: payload,
        });
        caps.emit('pickup', payload);
    })

    //in-transit

    socket.on('in-transit', payload => {
        console.log('EVENT:', {
            event: 'in-transit',
            time: new Date().toLocaleString(),
            payload: payload,
        });
        caps.emit('in-transit', payload);
    })

    //delivered

    socket.on('delivered', payload => {
        console.log('EVENT:', {
            event: 'delivered',
            time: new Date().toLocaleString(),
            payload: payload,
        });
        caps.emit('delivered', payload);
    })


})

module.exports = caps