'use strict';

const events = require('../events');

require('./models/Vendor/vendor');
require('./models/Drivers/driver');


//pickup

events.on('pickup', payload => {
    console.log('EVENT:', {
        event: 'pickup',
        time: new Date().toLocaleString(),
        payload: payload,
    });
});

//in-transit

events.on('in-transit', payload => {
    console.log('EVENT:', {
        event: 'in-transit',
        time: new Date().toLocaleString(),
        payload: payload,

    });
});

//delivered

events.on('delivered', payload => {
    console.log('EVENT:', {
        event: 'delivered',
        time: new Date().toLocaleString(),
        payload: payload,
    });
});


module.exports = events;