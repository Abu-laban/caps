'use strict';

const events = require('../../../events');

events.on('pickup', payload => {
    setTimeout(() => {
        console.log(`DRIVER: picked up ${payload.orderID}`);
        events.emit('in-transit', payload);
    }, 1000);

    setTimeout(() => {
        console.log(`DRIVER: delivered up ${payload.orderID}`);
        events.emit('delivered', payload);
    }, 3000);
});


module.exports = events;