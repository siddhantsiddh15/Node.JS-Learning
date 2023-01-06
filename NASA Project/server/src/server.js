const {app} = require('./app');

const http = require('http');
const mongoose = require('mongoose');

const planetsModel = require('./models/planets.model');
const { loadPlanetsData } = require('./models/planets.model');

const MONGO_URL = 'mongodb+srv://nasa-api:<Passwordhere>@nasacluster.nvrpti0.mongodb.net/?retryWrites=true&w=majority'

const PORT = 8000;
const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready ')
})

mongoose.connection.on('err', err => {
    console.error(err)
})

async function startServer(){
        await mongoose.connect(MONGO_URL);
        
        await loadPlanetsData();

        server.listen(PORT, () => {
            console.log('Listening on PORT ', PORT);
        })

}

startServer();

