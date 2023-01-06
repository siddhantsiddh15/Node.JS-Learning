### Making backend for a front end project

Start by making a client and a server folder. The files in client folder will communicate with the files in server folder. 

Our web application will communicate with our Node API through HTTP. 

We are starting with our server folder and will work on our MVC architecture. Let's start working on the folder structure of the server side. 

Make a ** models ** folder, make a ** routes ** folder. We should make a separate folder for our controller but with large projects it is advised to keep the code with same purpose in the same folder. So controllers folder should be made inside routes folder for this project. 

What about the VIEW component? Which folder should the view folder should be in? We are making our backend in our server folder and frontend in our client folder, which will be handling our VIEW. We won't make a folder named view now.

Make server.js file in server folder now. 

> We will have a package.json for our server, for our client and also in our root folder of our project. 

There are separate package.json for each front end and back end but why in root folder? It is required to bind our front end and back end. 

We have been provided a front end source and we need to install the node modules for it.

Go to the client folder and ender the following in the terminal

```
cd client

npm i

```

After the dependencies are installed correctly run the react app.

```
npm start

```
'start' is one of the few commands that doesn't need run keyword. Our React application is now running on our local host:3000.

Our first task is to understand how our client will use the API and then we will make the API.

If you will go to AppLayout.js file you will see 

1. Launch needs a. planets, b. submitLaunch, c. isPendingLaunch

2. Upcoming needs a. launches, b. abortLaunch

3. History needs 'launches'

Now go in the hooks, in requests.js you will find that there are 4 functions that needs to be implemented but needs the data from our API which we will build. 

Now go to server folder and initiate the node modules 

```
npm -y init

```

Install nodemon for convenience.

```
npm i nodemon -D

```

*** package.json ***

Change the "name" to nasa-project-api. Change "description" to NASA Mission Control API.

Add a script "dev" : "nodemon server.js" .

*** server folder ***

Create a src folder. Move all our JavaScripts in this folder.

Move server.js, models, routes into src folder. 

After changing the directory of server.js we need to change the same in the package.json as well.

src is in the same directory as package.json so change server.js mentions in package.json to *** src/server.js *** .

Our frontend React code runs on PORT 3000 by default. It is wise to use another port number for our backend.

So we will use PORT 8000. You can use any port number of your choice. 

We can specify our number as a variable in our 'package.json' as an environmental variable like this 

```
"start" : "PORT=5000 node src/server.js " 

```

If there will be a PORT defined in environment we will use

```
const PORT = process.envPORT

```
#### Create the server

This is a familiar way how we create a server using express. 

```
const express  = require('express');


const app = express();
app.listen();
 
```

Another way is to use the in built node module 'http' and use the .createServer() method which takes a callback function which listens to the requests made to our server.


```
const http = require('http');

const server = http.createServer();

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log('Listening on PORT ', PORT);
})

```

The createServer argument is still pending! What should go in there? We are now familiar with express. So we should use it.

We created our app object using express.

Pass the same in the createServer(). Whatever listener we will use on the app, createServer will respond to that!

```
const express  = require('express');


const app = express();


const http = require('http');

const server = http.createServer(app);

```

This use of in built and express function lets us separate the express code. We will write the code for our app object in separate file.

#### Create a file named app.js

Move these two lines of code from server.js to app.js and use app as an export from app.js

```
const express  = require('express');


const app = express();

module.exports = {app};

```

Import the app in the server.js now. You can do it right? Here is the code

```
const {app} = require('./app');

```

This kind of structure is suited to scale any node application. 

### Adding the endpoints

We will be dealing with planet data, so we will create planet collection in our routes.

We will create a separate folder for each of our collections and each collection will have a dedicated planets router. 

1. Make a folder named planets in routes
2. Make a file named planets.router.js 

#### Inside planets.router.js

We will use the express functionalities. 

```
const express = require('express');

const planetsRouter = express.Router();

```

Now we will put our get requests on planetsRouter.

```
planetsRouter.get('/planets', getAllPlanets)

```

Our collections will be under the /planets path. We will implement the getAllPlanets later.

To use the router we need to export 

```
module.exports = {
    planetsRouter
}

```
Import the module in app.js. Below the app object use the middleware that we imported

```

const app = express();


app.use(express.json());
app.use(planetsRouter)

```

The flow of program till now is like 

Requests come to express  -----> Get's checked for json data (express.json()) ------> Then sent to the planetsRouter  ------> The planetsRouter gets the planets from the getAllPlanets from the controller.

#### Create a controller for router in the same folder

We will start by declaring the planets array and getAllPlanets function.

We will set the status code as 200 and send planets array as a json object.


```
const planets = [];

function getAllPlanets(req, res){
    return res.status(200).json(planets);
}

```

Return keyword is important as on multiple times loading express will tell us that header-type has already been set. return ensures that our function stops executing at that point.

Make a new file in models planets.model.js and export the planets array from there. 

We have done this previously 

```
const planets = [];

module.exports = {
    planets
}

```

Now we can use our planets model in our controller . 

```
const {planets} = require('../../models/planets.model')

```
We moved up the folder structure twice in the path we gave in the require. 

Export our function getAllPlanet and import it in the app.js file.

```
const {getAllPlanets} = require('./routes/planets/planets.controller');

```

We have implemented the structure of our function. Time to go to the ** client ** folder and implement the request from  all planets. 

We will create const API_URL which will be equal to ' https://localhost:8000' This is the implementation of our getPlanets function

```
const API_URL = 'http://localhost:8000';
async function httpGetPlanets() {
 
  const response = await fetch(API_URL + '/planets')
  
  return await response.json()
}

```


#### Check the working of our API

Start the server. We wrote the nodemon command already, so it;s time to use it

```
npm run dev

```

We need to run of front end part as well. Open a new terminal(it is a built in feature of VS code)


This error will be shown in the console

```
Access to fetch at 'http://localhost:8000/planets' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

```
Let's understand what is CORS middleware 

### CORS 

Click [here](https://excalidraw.com/#json=szbPvNh_dRaOQPAXfx1UM,p0B_-MgcsqK0jjfXEnDKRw) to understand parts of a URL

Origin is the combination of site's protocol, host and port.

Browsers by default block the cross origin requests so data doesn't get leaked to another site unintentionally. 

We can allow cross origin requests by specifying Access-Control-Allow-Origin header from the server. This can allow all the requests from any site if we specify it as '*' or allow requests only from a specific origin. The allowing of specific websites allow the practice of white-listing. 

We have an npm module cors which is a middleware to enable CORS with various options. 

Install cors in our server.

``` npm i cors ```

We will import the cors in our app.js

We need localhost:3000 to access our cors property. This is how cors middleware will be implemented here.

```
app.use(cors({
    origin: 'http://localhost:3000'
}));

```
It takes an object with origin property.

Incase we want to have list of websites that are whitelisted, cors allow that too.

We need to pass the array. Read more about it [here](https://www.npmjs.com/package/cors) . 

We don't need that right now. 

Run the server and client again now we won't get cors error. 

#### Why we separate MODELS and CONTROLLERS

A router and controller are always one to one so we keep them together. There is always a controller for a router. 

For models, many models can be used for a single controller or a single model can be used by many controllers. 

We separate our models because our data doesn't necessarily match with the collections and API endpoints. 


### The Planets Model 

Bring the nasa_data.csv in a folder named 'data' inside the 'server' folder. Copy the code we wrote during parsing the .csv file. 

We need to wait before our planets array get populated. 

We have already a written code that parses the .csv file from NASA. 

We will re-use that code.

The following problems will arise:

1 . The code will be executed later but our server will start before it. The best thing to do in such conditions is to use a promise.

A quick recap of promise :

```
const promise = new Promise((resolve, reject) => {
    resolve(42);
})

promise.then(result => {

});

const result = await promise;
console.log(result)

```

We use .then() to process the data we received from the promise. We can store the result of the promise using the await as well. 

2 . So we put all our written code in new function named loadPlanetsData(). We will call our resolve() function at end without passing any parameter as we are populating our array. We will call the reject() when we face any error.

3 . We will export our loadPlanetsData and array. Following is the updated code, we will further work in our serve.js to update the loading of data before our server is active.

```
// planets.model.js

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


module.exports= {
    loadPlanetsData,
    planets: habitablePlanets
}


```

Inside server.js we will import the function and we will use an async function to load our server now.

This is a normal widely recognized practice to load certain functionalities before or server is up and running

```
async function startServer(){

        await loadPlanetsData();

        server.listen(PORT, () => {
            console.log('Listening on PORT ', PORT);
        })

}

startServer();

```

startServer() will call the server.listen() but our loadPlanetsData will populate the array first.

The model will populate the array, controller will return the planets array as json, router will set the end point /planets and finally that will be sent to the app.js which will use the middleware planetsRouter. The app module will further be used in the server.js 

### How to use path module?

Start by importing the path module.

```
const path = require('path');

```

Now where ever we have to use the path module we need to do the following

```
// fs is file system module that is already imported

fs.createStream(path.join(__dirname, '..','/folder_name', '/file_name'))

```

### Automating Full Stack applications with npm

We are running our client and server in separate terminals. This is can be done together in a single terminal.

We create a package.json in our root folder that contains both client and server.

```
npm -y init

```

We don't need a node_modules in our root folder to run both client and server simultaneously. Simply go to the scripts section of the package.json and make custom commands to run server and client separately.

1. We will first go to the server directory and there we will run the dev script

2. Similarly we will go to the client directory and run the start script provided by the react app. 

```

"scripts": {
    "server" : "cd server && npm run dev",
    "client": "cd client && npm start",
    
```

This is quite lengthy and can be done in shorthand using the *** --prefix ** keyword

--prefix specifies to go to a specific folder named after it. This is how we do it

```
"server" : "npm run dev --prefix server",
    "client": "npm start --prefix client",

```
The script will do the same thing as --prefix tells the terminal to go to the server and client folder.

The " ** && ** " allows joining of two scripts and the second script runs after completion of first script.

#### Run both client and server simultaneously

Create a custom script named 'watch'

```
 "watch" : "npm run server && npm run client",

```
This should run? No! The second command will run when first command is finished executing. The server never stops running so our second script will never be executed. 

To fix this use ' & ' instead of ' && ' and both the scripts will run together.

```
 "watch" : "npm run server & npm run client",

```

There are other functionalities as well now that we can do using the above techniques. 

```
"scripts": {
    "install-server": "npm install --prefix server",
    "install-client": "npm install --prefix client",
    "install": "npm run install-server && npm run install-client",
    "server" : "npm run dev --prefix server",
    "client": "npm start --prefix client",
    "watch" : "npm run server & npm run client",
    
  }

```
The install script does not need to run both commands at the same time so we can use && .

install script will do any installation we need to do for server and then it will do the same for client.

Run install script like this 

```
npm install

```

### Running our project in production


We get a production ready optimized code on running build script in our react app. 

We want to server our files from server only, to do that we change the build script from 

```
"build": "react-scripts build",
    
```

to 

```
"build": "set BUILD_PATH=../server/public&& react-scripts build",

```

Before knowing functions, make sure there is not space between 'public' and '&&' else windows will save the folder as 'public ' instead of 'public' and our front end will never load.


set BUILD_PATH is pointing to the public folder inside the server folder, on running the build script now the server folder will have a public folder.

In case there is Plugin "react" was conflicted between "package.json » ....xxxx comes make sure the path in powershell is same as in windows explorer ie. the path should be exactly same characters as shown in windows.

Now we will use the express.static() to host our build folder from our server end only.

This code will be added inside the app.js

```
app.use(express.static(path.join(__dirname, '..', 'public')));

```

On running our server only we will see the frontend being available on port 8000.

Since our application is serving the public folder we need to handle the case where we get '/' endpoint request as well.

```
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

```

This ensures our landing page is correctly displayed on visiting localhost:8000/

### The Launch Model

Declare a model.
Export it.

Declare a router, export it.
Go to app.js, import the router. Use it using .use() function.

Go to routes folder, create a separate folder for launches. 
Make a router file and a controller file. launches.controller.js and launches.router.js

Handle get request of /launches endpoint and export it from launches.router.js

```
launchesRouter.get('/launches', getAllLaunches);

```

Go to launches.controller.js and make a function that will getAllLaunches. Export it and import it in launches.router.js

#### Concepts used :

1 . Array.from(launches.values())
2 . Map() contains key => value


``` 
launches.set(launch.flightNumber, launch);
 ```
launches.values() will contain the keys as an object. Since we are giving a single key, we will get the launch object. 


Array.from() will return or say convert the object to an array. 

```
{{ flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: 2030-12-27T00:00:00.000Z,
    destination: 'Kepler-442 b',
    customer: [ 'ZTM', 'NASA' ],
    upcoming: true,
    success: true } }

```
The object above will be launches.values(). 

```
[ { flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: 2030-12-27T00:00:00.000Z,
    destination: 'Kepler-442 b',
    customer: [ 'ZTM', 'NASA' ],
    upcoming: true,
    success: true } ]
```
The array was converted by Array.from() . 

To test the working of the API, go to the POSTMAN, add a new request. Set the URL to http://localhost:8000/launches and send the request. 

```
app.get('/*', () => {})

```

Notice the '*'! It is supposed to match all the characters after the endpoint and the above example should be used at the end of the get requests so if nothing matches, the server will send response.

### Building a Data Access Layer

A naming convention, any function starting with httpFunctionRemainingName will send response. 

** Layered Architecture **

It includes a logical structuring mechanism for the elements that make our app.

Application Layers are consist of 

1 . User Interface
2 . Business Logic 
3. Data Access

Whatever we know from MVC architecture we can make an analogy that User Interface is View. Business Logic is Controller and Routers. Data Access is our models. This is just an analogy.

Application Layer is a part of design principle named separation of concerns (SoC), which separates a computer program into distinct sections such that each section is dealing with a separate concern. This separation helps keep track of changes we make in specific portions of program and keep track of relationship between different components. It helps in scaling the code in a better manner. 

### POST/launches

We need a function that add  a new launch in launches map on POST request. We write the function in model and export it. 

We will add an id using a variable and increment it.

The function created in model will be exported to controller. In controller we will make a function that will take the req, res and call the function exported from model.

The controller will send the function created to the router where on get method we will use the function exported from controller.
 
1 . Model will export the post function created

2 . Controller will use the function from model on req and in post request will send the copy of the request body, in this case it is launch

3 . Controller will export the function which will be used by router. 

We use the ``` app.use(launchesRouter) ```
but since all our router will contain the /launches endpoint followed by something else, we can do it in a cleaner way 

``` app.use('/launches', launchesRouter) ```

This will change the get and post request in launches.router.js as well the .get('/launches', functionName) will now change to .get('/', functionName)


We will find our launch in the req body. We have added a middleware in app.js so out launch is parsed and ** req.body ** will give us the object in this particular request. 

``` Object.assign(objectName, {new properties}) ``` is used. This can be done using the spread operator as well but we will find that our latestFlightNumber is not getting incremented with each addition.

```
Object.assign(launch,
            {customer: ['ZTM', 'NASA'],
            upcoming: true,
            success: true,  
            flightNumber:latestFlightNumber})
```

### POST/launches validation for post requests

We will check for properties inside the object we get. If we don't find any of the required property we will send a status 400

```
if(!launch.mission || !launch.rocket ||
        !launch.launchDate || !launch.destination){
            return res.status(400).json({
                error: 'Missing required launch property'
            })
    }
```

** Validating the date ** 

The are few methods 

1 . matching the string with 'Invalid Date' 

```
if(launch.launchDate.toString() === 'Invalid Date'){
        return res.status(400).json({
            error: "Invalid Date"
        })
    }
```

2 . Using built-in NaN function 

```
if(isNaN(launch.launchDate) ){
        return res.status(400).json({
            error: "Invalid Date"
        })
    }
```
### Connect /launch to the React Frontend

It's now logic game. You already know the concepts by now. 

If our endpoint is 

``` '/:id ```

we can get the id parameter using the req.body.params 

```
const launchId = req.params.id;

```

### Versioning our APIs

We will create a route /v1/planets and will re-direct our requests to this router.

To make things cleaner we need to make a separate file for our versions. Since we are using 1 version only we will make a single file named api.js (for this example) in our routes and send all our requests to the api.js

For now the api.js will look like this

```
const {planetsRouter} = require('./planets/planets.router');
const {launchesRouter} = require('./launches/launches.router')

const express = require('express');

const api = express.Router();

api.use('/planets',planetsRouter);
api.use('/launches', launchesRouter);


module.exports = {
    api
}

```

Following things are being done in this file

1 . The planets and launches router modules are being imported here

2 . There is no express module here so we imported the express using ``` require('express') ```

3 . We need the Router() functionality of express so we created api object just like we created planetsRouter and launchRouter in planets.router.js and launches.router.js

4 . Now we have the the two middleware and we export the api object. 

Inside app.js we will import our api module and use the following middleware

```
app.use('/v1',api)

```

Incase we have many more version we will use the similar process. 

We updated our routers but we need to update our frontend as well. 

Go to the requests hook and change the API_URL which is base URL to

```
const API_URL = 'http://localhost:8000/v1';

```

Run the deploy and our project will listen at 8000