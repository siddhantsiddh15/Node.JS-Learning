const path = require('path');
const { parse } =  require('csv-parse');
const fs = require('fs');

const planets = require('./planets.mongo')


function isHabitable(planet){
    return planet['koi_disposition'] === 'CONFIRMED' && planet.koi_insol > 0.36 && planet.koi_insol < 1.11 && planet.koi_prad < 1.6;
}

const results = [];
const habitablePlanets = [];
// take the data from the fs



function loadPlanetsData(){
    return new Promise((resolve, reject) => {

        const content = fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'nasa_data.csv'));

        content.pipe(parse({
            comment: '#',
            columns:true,
        }))
        .on('data', async (data) => {
            if(isHabitable(data) ){
                // habitablePlanets.push(data)

                // implement the upsert operation here
                savePlanet(data)
            }
            results.push(data);
        })
        .on('error', err => {
            console.warn(err);
            reject(err);
        })
        .on('end', async () => {
        
        // create a variable for mongoDB
        const countPlanetsFound = await (await getAllPlanets()).length
        // console.log(habitablePlanets.length)

        console.log(` ${countPlanetsFound} habitable planets found `)
            console.log('done');
        })

        resolve();
    })
}


async function getAllPlanets(){

    return await planets.find({},
        {
            '_id':0, '__v': 0
        }
        );
    // not using this as we now use mongoose
    // return habitablePlanets
}

async function savePlanet(planet){
    try{
        await planets.updateOne({
            keplerName:planet.kepler_name
        },{
            keplerName:planet.kepler_name  
        },{
            upsert:true
        })
    }catch(err){
        console.warn(`Could not save planets ${err}`)
    }
    
}

module.exports= {
    loadPlanetsData,
    getAllPlanets
}


