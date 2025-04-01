const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('start', () => {
    console.log("Application Started!");
});

emitter.on('data', (data) => {
    console.log(`Data received: ${data}`);
});

emitter.on('error', (err) => {
    console.log(`Error occurred: ${err}`);
});

emitter.emit('start')
emitter.emit('data', `name: "John Doe", age: 25`)
emitter.emit('error', `data does not exist`)




  
