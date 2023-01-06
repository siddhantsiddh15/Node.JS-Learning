### Databases

What is a schema?

A schema defines the structure of the data that we store in our database.

#### Where to use MongoDB

MongoDB is best for unstructured data or where the storage of data is important and not the way it is stored ie. structure of data. 

SQL is great where the way we store our data is really important example like for Banking System we need the data to be structured correctly. 

SQL is reliable when we do the CRUD operations and the ACID transactions.

A - Atomicity
C - Consistency
I - Isolation
D - Durability

ACID ensures our data is always stored as a whole and some part of it is not lost(atomicity). 

### Setting up MongoDB

Go to the official [website](https://www.mongodb.com/home) of MongoDB

Go to the products section and select the Atlas. We usually work with data stored on cloud and Atlas is a service that let's us practice how we will use the data from cloud. 

Sign up to Atlas and we will be able to deploy our data from cloud.

Now we will get a bunch of options to configure our cloud. I chose the free version for this project and Mumbai region of AWS.

Select the tier as free forever and name the cluster NASACluster. 

Create a user and password by going in the database section. While giving privilege follow the principle of least privilege. 

It states that a subject should be given only those privilege that is needed to complete it's task. 

After creating the user go to network access and set the IP address to universal. 

Now go to ** database ** section and set the driver to Node.JS and version whichever you are using. 

### Connecting to  MongoDB 

We need a popular node package named Mongoose. 

Mongoose has features of making queries and make models from our data.

Install mongoose into our server folder.

```
npm i mongoose 

```

Inside server.js declare the MONGO_URL equal to the url generated on MongoDB website

```
const MONGO_URL = 'mongodb+srv://nasa-api:UcZHPjwEjHJUfvTf@nasacluster.nvrpti0.mongodb.net/nasa?retryWrites=true&w=majority'

```

Now import the mongoose into the server.js

```
const mongoose = require('mongoose')

```

We have declared an async startServer() function. Declare the ** mongoose.connect() ** to connect to the MONGO_URL . 

We want to connect to the MongoDB before our server is loaded so we can handle the requests made by the user. 

nasa is the database name.  and the <> contains the password. 

```
await mongoose.connect(MONGO_URL)

```
.connect is a promise so we use the await keyword.

Apart from that we need to handle the connection with mongoose so we need to handle the error and opening events

```
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready ')
})

mongoose.connection.on('error', err => {
    console.error(error)
})

```

.once is used whenever an event is going to occur only once. 


### Mongoose

Mongoose is the node package we will use to connect to the MongoDB. 

It provides us object modelling.

MongoDB basically collects JSON like objects in form of documents. 

** Mongoose gives us a schema that are tied to a collection in MongoDB. Each schema maps to a group of documents inside a collection.

The way we create our schemas is by creating model that uses the schema.

Model is like taking a schema which lies in Mongoose and applying it to a collection.

To create a model, take a schema and assign it to one of our collection. 

**

Now we can query our models to get the data and documents stored in our Mongo collections/collections. Model provides us the JavaScript object. 

#### Creating Mongoose schema for Launches

We will replace our in-line storage of our launches and planets by Mongo Database. 

We need to import Mongoose first. Then we create a schema by passing an object inside the moongoose.Schema() function


```
const mongoose = require('mongoose');

const launchesSchema = mongoose.Schema({
    flightNumber: {
        type:Number,
        required: true,
        default:100,
        min:100,
        max:999},
    launchDate: Date,
})

```

The object that we are passing corresponds to the object we made in our launches model. 

``` launchDate: Date ```

Tells the object to be taken as launchDate will have to be a Date.

*** flightNumber: {
    type:Number,
    required: true,
    default: 100
}

***

type specifies that flightNumber has to be a number. 
required specifies it is required or not. In this case it is required.
default sets the initial value of flightNumber
min and max sets the limit.

These functionalities are provided to us by mongoose. We will declare the object like this only. 

To make things easier, we should keep the name of the keys same as we are going to use it in our front end.

#### Creating Models from Schemas

A schema is useful when it is mapped to a collection of documents inside our MongoDB.

```
mongoose.model('Launch', launchesSchema);

```
This is how we connect our schema created to our collection. This is written at the end of our launches.mongo.js file.

The line of code allows us to create an object that will allow us to perform CRUD operation in our launches collection.

Export the model like this

```
module.exports = mongoose.model('Launch', launchesSchema)

```

We can now use the schema we created wherever we will need it

### MVC Models vs Mongoose Models

Mongoose models and schemas are objects and classes that Mongoose provide to us to talk to collections of documents.

Models in MVC is a concept and not objects/classes. Models in MVC can be applied to any database or external data source. 

The model files in MVC projects act as a data access layer that controls how data is read and updated. In case we want to change the implementation of how data is being accessed we can change it through of model files.

### Creating and Inserting Documents

Instead of pushing our planets data in array, we will use the .create function.

But since our function will be called many times during CRUD operations the data will be duplicated. To tackle this we will use the upsert operation.

upsert - update + insert

The update part allows us to insert only when the object we are trying to insert is not present. 

### Finding Documents in Mongoose

We will update the getAllPlanets in this section. 

Concepts used :

.find({})
.create({})
.update({})
.updateOne({})


```
await planets.updateOne({
            keplerName:planet.kepler_name
        },{
            keplerName:planet.kepler_name  
        },{
            upsert:true
        })

```

The first object in parameter is checking if the planet is present or not with kepler_name.

If it is not present it will create one in database, if it is present it will look for matching condition that we provided in the second parameter.

If it is present it will look for the third parameter where we are passing upsert:true so it will update.

### Exploring data using Atlas

Consider we end up making mistake while creating the data. We end up duplicating our data unnecessarily. 

We go to our MongoDB atlas and manage our data from there.

Go to NASACluster in MongoDB, go to Collections tab. You will find the database that we created there.

### Object IDs in MongoDB

> 
_id : ObjectId('
63b51fefd348ddc27d02e1b2')
keplerName
"Kepler-1652 b"
__v
0

ObjectIds ie _id and __v are automatically created when we create a document.

_id are random like value through which Mongo identifies an entry. 

__v are not something that Mongo creates but is an added feature by mongoose. It is called version key and is used to track the version of document that we created. 

If we change the schema of our collection, the __v will be increased of the new document. If we want to exclude the _id and __v we need to make changes in our requests

```
async function getAllPlanets(){

    return await planets.find({}, {
        '_id': 0, '__v' :0
    })
    
}

```
The second argument of the find property is telling we want to exclude the _id and __v properties.

### Saving Launches

We will use the mongoose module and change our launches.set() function of Map to saveLaunches()

This is what we have to do 

1 . Replace our Map() function to a custom function that will use the mongoose module

We will use the updateOne() where we will pass 3 parameters

1 . If the flightNumber doesn't exist, we will perform insert. We will insert launch object

2 . If it exists we are going to update it

3 . We are doing the upsert operation so third argument will contain an object having {upsert : true}

### Listing all our launches

We will change the getAllLaunches() function.

Earlier we were getting the value from our launches map, now we will use the database. 

```
async function getAllLaunches(){
    return await launchesDatabase.find({},{
        '_id':0, '__v':0
    })
    
}

```

We are using launchesDatabase that we got from our launches schema. 

.find({}) allows us to get all the files and the second argument allows to filter the id and v parameters.

Make sure to make every function async wherever getAllLaunches is being called.

### Referential Integrity

What will happen if we fin a planet that does not exist in our database.

### Check if a launch is invalid or not

```
const planet = planets.findOne({
        keplerName: launch.target
    })

    if(!planet){
        throw new Error('No matching planet found');
        
    }

```
Find the planet name provided in the planets schema. If the planet does not exist throw an error by creating an error object. 

### Getting latest flight number

Create an async function. 

.find({}) returns a list of documents that matches our filter.

.findOne() will return one document

.sort() will sort the documents in ascending order based on the property passed. 

.sort('flightNumber')  will sort in ascending order

.sort('-flightNumber') will sort in descending order. See the negative sign before property

### Scheduling new launch

We will write an async function that will use the database it in place of addNewLaunch

```

async function scheduleNewLaunch(launch){

    const newFlightNumber = await getLatestFlightNumber() + 1

    const newLaunch = Object.assign(launch,{
        success:true,
        upcoming:true,
        customer : ['ZTM', 'NASA'],
        flightNumber: newFlightNumber
    });

    await saveLaunch(launch);
}


```

