
const { parse } =  require('csv-parse');
const fs = require('fs');

function isHabitable(planet){
    return planet['koi_disposition'] === 'CONFIRMED' && planet.koi_insol > 0.36 && planet.koi_insol < 1.11 && planet.koi_prad < 1.6;
}

const results = [];
const habitablePlanets = [];
// take the data from the fs
const content = fs.createReadStream('./nasa_data.csv');

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
    console.warn(err)
})
.on('end', () => {
//    console.warn('results',results);

   console.log('habitable planets', habitablePlanets.map(planets => {
    return planets.kepler_name
   }))
   console.log(habitablePlanets.length)
    console.log('done');
})






