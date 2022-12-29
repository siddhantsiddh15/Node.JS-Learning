const express = require('express')
const cluster = require('cluster');
const os = require('os');

const app = express();

function delay(duration){
    const startTime = Date.now();

    while(Date.now() - startTime < duration){
        /// event loop is locked till we are in loop
    }
}


app.get('/', (req, res) => {
    res.send(`Performance Example  ${process.pid}`);
})

app.get('/timer', (req, res) => {
    delay(4000)
    res.send(`Beep beep beep!  ${process.pid}`);
})

if(cluster.isMaster){
    console.log('Master has been started');
    const NUM_WORKERS = os.cpus().length();

    for(let i =0; i< NUM_WORKERS; i++){
        cluster.fork();
    }
    
}else{
    console.log('Work process started')
    app.listen(3000);
}




