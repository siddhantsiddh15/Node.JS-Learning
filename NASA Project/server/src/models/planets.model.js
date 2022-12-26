const path = require('path');
const { parse } =  require('csv-parse');
const fs = require('fs');

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
        .on('data', data => {
            if(isHabitable(data) ){
                habitablePlanets.push(data)
            }
            results.push(data);
        })
        .on('error', err => {
            console.warn(err);
            reject(err);
        })
        .on('end', () => {
        
        console.log(habitablePlanets.length)
            console.log('done');
        })

        resolve();
    })
}


function getAllPlanets(){
    return habitablePlanets
}

module.exports= {
    loadPlanetsData,
    getAllPlanets
}


