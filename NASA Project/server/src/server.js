const {app} = require('./app');

const http = require('http');

const planetsModel = require('./models/planets.model');
const { loadPlanetsData } = require('./models/planets.model');


const PORT = 8000;
const server = http.createServer(app);

async function startServer(){

        await loadPlanetsData();

        server.listen(PORT, () => {
            console.log('Listening on PORT ', PORT);
        })

}

startServer();

