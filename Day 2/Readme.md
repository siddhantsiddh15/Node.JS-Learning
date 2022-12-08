#### Visiting NASA website to gather information of the Kepler's data

Go to the NASA Exoplanet Archive. You can google it or visit it directly by clicking [here](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=cumulative) .

On visiting the site, click on 'Download Table' and select the .csv option. Once it is downloaded we will read this data using Node.

### Reading the .csv file

What does .csv mean? It stands for "Comma Separated Value". 

Drop the downloaded file from NASA Archive in the folder where you are working. You will see the downloaded file is very large.

Go to npmjs.com and search for a module that may support csv files. 

You will find ``` csv - parse ``` . Install it using the command 

``` npm i csv-parse ```

#### How we read large data files in Node?

We use the NodeJS stream API for this purpose. 

There are other APIs like sync and callback API as well.

Each API has some advantage and some disadvantages although the underlying implementation of each one of them is based on same principles.

Stream API is used when we care about scalability of our code. 

> In Node all streams are implemented by event emitter where events are emitted by Node and we react to those streams using the .on function.

Our NASA archive is having a large number of planetary data. 


#### Reading our NASA-Archive's data

We will first need the parse function from csv-parse module. To access the file system we will also use the fs module.

```
const { parse } =  require('csv-parse');
const fs = require('fs');

```
After this we use the createReadStream function from fs module and store it in a content.

Our aim is to store the csv file into an array which we will see in console later.

```
const content = fs.createReadStream('./nasa_data.csv');

const results = [];

```

We will now need to take the output of createReadStream function and process it to our parse function. 


.pipe() function is meant to store a readable stream source to a writable stream destination. 

Nasa_data is the source and parse function will be the destination.

csv file will be read through createReadStream. Then whatever was read will be connected to another stream by pipe. 

The pipe will have input as output of createReadStream and output will be the output of parse function that will give us a processed data which can be understood easily. 

pipe will take another argument and since we want it to connect to parse function we will put parse in it.

```
content.pipe(parse({
    comment: '#',
    columns:true,
}))

```

parse will take an object to understand the csv file. Now our csv file contains many commented lines which start with a '#'. The comment key ensures while parsing the file every line starting with '#' will be ignored. 

> The column key ensures we will get our array with keys mapped to values for each entries.

After the data stream has been parsed we will use the on function which will listen for 'data','error' and 'end'.

This is how our code will look in total 

```
const { parse } =  require('csv-parse');
const fs = require('fs');

const results = [];

const content = fs.createReadStream('./nasa_data.csv');

content.pipe(parse({
    comment: '#',
    columns:true,
}))
.on('data', data => {
    results.push(data);
})
.on('error', err => {
    console.warn(err)
})
.on('end', () => {
    console.warn(results);
    console.log('done');
})

```

Our data is available in an array now we will finding some Earth like planet

#### Using the data for extracting information

We will create a function that will filter out planets which are habitable. 

In our csv file 

1. koi_disposition key tells if a planet is confirmed.

2. koi_insol tells the stellar flux which should be in the range of 0.36 and 1.11

3. koi_prad tells the acceptable radius of the planet.


Using those three keys we will make the isHabitable function.

```
function isHabitable(planet){
    return planet['koi_disposition'] === 'CONFIRMED' && planet.koi_insol > 0.36 && planet.koi_insol < 1.11 && planet.koi_prad < 1.6;
}

```

And when our data will be parsed we will put a check and push it in our array.

```
.on('data', data => {
    if(isHabitable(data) ){
        habitablePlanets.push(data)
    }
    results.push(data);
})

```

``` habitablePlanets ``` is a separate array we declared just like results array.

Our data is now filtered out to us containing list of planets which are habitable.

When our code ends we can log our planet names like this 

```
console.log('habitable planets', habitablePlanets.map(planets => {
    return planets.kepler_name
   }))

```   

