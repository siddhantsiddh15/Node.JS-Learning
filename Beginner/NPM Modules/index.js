const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}; // taken directly from the docs

// initialize object

const myEmitter = new MyEmitter();

// add listener for the log event
myEmitter.on('log', msg => {
    logEvents(msg)
})

// we are using the setTimeout method to see the difference between two events clearly. We can also not use the setTimeout method

setTimeout(() => {
    myEmitter.emit('log', 'Log event emitted!');
}, 2000);
