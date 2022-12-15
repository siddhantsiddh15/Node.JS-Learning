### Model View Controller

Model View Controller is a software design pattern commonly used for developing UI.

It tells us how to organzie various different pieces of code based on their functionalities.

Model -> View -> USER -> Controller

These controllers in Express are the functions that react tot the incoming requests and sned the response accordingly. 

The Model is the data. It could be a database or an in-memory information. Model also contains some function to access the database.

View is how the data is presented back to the user, it can be graphs, diagrams, entire web applications.

MVC is meant to simplify our code and make it easier to understand. 

Splitting our code into these layers allows our code to be easier to read, update and improve as each layer is responsible for a single thing.

### MVC in Express

We will start with our route handlers, these functions process the request coming in and response going out are going to be our controllers.

Start by making a folder named containers. We will create a single controller module for each of our collections of data. So one for friends and one for messages for now. 

This breaking down things allow us to work easily when working on large servers. 

Make a new module in containers folder named *** messages.controller.js *** . This lets us know this fils is for messages and a controller. Create another file friends.controller.js . 


Move our handlers to controllers and make them as named functions so it will be easy to debug.

We need to export our friends array to a separate file named friends.models.js as models are where we store our data in MVC architecture.

After doing all this our index.js file will be much cleaner and all our handlers will be in different files making the code more organized.

*** index.js ***

```

const express = require('express');

const friendsController = require('./controllers/friends.controller')
const messagesController = require('./controllers/messages.controller')
const app = express();

const PORT = 3000;

app.use((req, res,next) => {
    const start = Date.now();
   

    next();
    const delta = Date.now() - start; // calculate time elapsed

    console.log(`${req.method} ${req.url} ${delta}ms`);
})

app.use(express.json());

app.listen(PORT, () => {
    console.log('Server is listening at PORT', PORT)
})

app.post('/friends', friendsController.postFriends)
app.get('/friends', friendsController.getFriends)
app.get('/friends/:friendID', friendsController.getFriend)



app.get('/', (req, res) => {

    res.send('Hello');
})

app.get('/messages', messagesController.getMessages)
app.post('/messages', messagesController.postMessage)


```

*** friends.controller.js ***

```
const {friends}  = require('../models/friends.models')



function getFriends(req, res){
    res.json(friends)
}


function postFriends(req, res){

    if(!req.body.name){
       return  res.status(400).json({
            error: 'Missing friend name'
        })
    }
    const newFriend = {
        name: req.body.name,
        id:friends.length
    }

    friends.push(newFriend);

    res.json(newFriend)
}

function getFriend(req, res) {
    const friendID = req.params.friendID - 0;
    const friend = friends[friendID];
    if(friend){
        res.status(200).json(friend);
    }else {
        res.status(404).json({
            error: 'friend doesnot exist'
        })
    }
}



module.exports = {
    getFriends,
    postFriends,
    getFriend,

}

```

*** friends.models.js ***

```
const friends = [
    {name:'Siddhant',
    id: 0},
    {name:'Amit',
    id:1
    }];


module.exports = {friends}

```

This is a simple example of MVC architecture. 


### Routers

Router is used to organize the routes in our application in smaller groups. 

It is like a mini application, it contains it's own set of middlewares and routes just like Express. We use router to break down our application and make it more modular.

#### Create a Router

```
const friendsRouter = express.Router()

```

We can now add our friends route to router instead of adding to our app object directly. We use Router like any other middleware application in Express.

So just like any other middleware we need to use the middleware

```
app.use(friendsRouter)

```

We sometimes call this mounting over the app object.
Router allows us to mount a group of paths under a specific path. 

So, all are friends are going to be in '/friends' path or with something after '/friends/:id' we can mount our friendsRouter on our '/friends' path

```
app.use('/friends', friendRouter)

```

After doing this we will change the .post and .get methods.Since our friendsRouter will take everything related to '/friends' path so we can change the post with a '/' and get methods like this

```

friendsRouter.post('', friendsController.postFriends)
friendsRouter.get('', friendsController.getFriends)
friendsRouter.get('/:friendID', friendsController.getFriend)

```

> Always call the app.use() so express maps requests to all paths starting with '/friends' are routed

Now this can become big chunks of code, so we move our routes to separate folder. 

We will make routes folder with two files, friends.router.js and messages.router.js 

*** friends.router.js ***

```
const express = require('express');

const friendsController = require('../controllers/friends.controller')

const friendsRouter = express.Router();

friendsRouter.post('', friendsController.postFriends)
friendsRouter.get('', friendsController.getFriends)
friendsRouter.get('/:friendID', friendsController.getFriend)


module.exports = {
    friendsRouter
}

```
We can export our friendsRouter now and work on the methods in the index.js and it will still work

import the friends.router module in index and run the index file.

Do the same for messages.router file

```
const express = require('express');

const messagesController = require('../controllers/messages.controller');

const messagesRouter = express.Router();

messagesRouter.get('/', messagesController.getMessages);

messagesRouter.post('/', messagesController.postMessage)

module.exports = {
    messagesRouter
}

```

Now we have modules that tell us the functionalities of different routers and we can add middlewares in these specific router files as well that will be specifiv to particular router. 

Like we do the following in friends.router file

```
friendsRouter.use((req,res, next) => {
    console.log(req.ip);
    next();
})

```

We are logging ip address using ``` req.ip ``` function. 

> Remember to call the next() function in your middleware

On making the request using Postman we will see IP address as '::1' . It is another way of saying localhost. This is IP address 6 syntax. 

127.0.0.1 is IP address 4 syntax . 

There is something you will notice. The routes that are being logged in our console are that which are passing to our router and not the full path. This is not useful for us. We need to modify our middleware to ``` req.baseURL ```

Go to the index.js file and update the console 

```
console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);

```

We used the ``` req.baseUrl ``` here. 

### RESTFul APIs

REST is the most common pattern followed while building APIs. When we are building APIs following REST pattern we call it RESTful APIs. 

** RE ** presentational ** S ** tate ** T ** ransfer is full form of REST. It a set of guidlines and best practices derived from Roy Fielding's original paper. 

Representation and State refer how the server makes the data available. Transfer part talks about how it is sent back to the user. 

1. Use existing standards(HTTP, JSON, URL)
2. Endpoints are collections of data
3. Use GET, POST, PUT and DELETE to communicate the action that we are performing on that collection of data. 
4. Client and Server architecture. 
5. Our requests are both Stateless and cacheable. Stateless means every request is independent and not connected to any state on the client. We are only keeping track of data of the collections. 

### CRUD

It stands for Create Read Update Delete. Following are HTTP requests corresponding to each CRUD term :

Create - POST
Read - GET
Update - PUT
Delete - DELETE

#### Sending files

Sending entire files that are present on our server machine back to the client.

We will use res.sendFile() to send the file and it takes the path of the file we want to send. sendFile needs to know the absolute path of the file. 

We will use the in-built path module. We will use path.join() to combine the different components of our path. 

__dirname is a built in variable which gets the folder name where the current file exists.

So __dirname will point to our controller folder. Now we need to go up in our folder structure to look for public file. 

We will use '..' to tell node to look one directory up. 

```
path.join(__dirname,'..','public', 'picture.jpg')

```

This line of code means 
a. look in the current folder
b. go one level up in folder structure
c. search for public folder 
d. look for picture.jpg.

Express will set up the content-type based on the extension of our file nae. 

We can finally send the file using the .sendFile function

```
const path = require('path');

function getMessages(req, res){
    
    res.sendFile(path.join(__dirname,'..','public', 'picture.jpg'))
    
}

```

#### Serving 1000s of files from our server

*** Serving Websites with Node ***

One way to serve a website containing HTML, images, pdfs and other stuffs is to use the express static file middleware . 

We write the following code to use our middleware

```

app.use(express.static());

```

.static() takes the relative path of the folder that we want to make available from our server. 

We will use our public folder which will have some html site in it. You can use any sample website in this folder. 

```
app.use(express.static('public'));

```

Just like our endpoints we can mount our middleware on some site

```
app.use('/test',express.static('public'));

```

express.static takes a relative path specific to the folder from which we launch our node application. 

So if we change the directory and then run ouur index file, our server will run but express won't be able to find the public folder.

We will use the path.join() function again. 

```

app.use('/test',express.static(path.join(__dirname, 'public')));

```

So now .static() middleware is taking the absolute path now. 


### Templating Engines

Handlebar is a more modern templating engine based on the older mustache engine. It uses {{}} 'curly braces' as placeholder for variables.

Fundamentally all templating engines are same using slightly different syntax

When we run our express server, the templating engine replaces the variables marked with our curly braces with their actual values that come from the node server and it transforms the HTML document to an HTML file to be rendered by the browser. This allows us to populate our HTML with data before sending to the client to be shown to the user. 

To use template engines we need to install npm packages.

For installing hbs we will use

```
npm i hbs --save

```

We don't need to import our template engines. We need to tell express which templating engine we are using and where we are using it. 

Go to the app.set() method in documentation of Express and look for view engine and views. These are our templating engines.

```
app.set('view engine', 'hbs'); 
app.set('views', path.join(__dirname, 'views'));

```

We made a views folder. Writing above two lines of code will tell express all the information it needs to load our handlebar internally and to find our templates in our project folder. 

Move the index.html to views folder to comvert it to template.  

Since we are using now handle bars and there will variables inside the index.html it is no more a pure .html file. Rename index.html to index.hbs .

After renaming it put variables in place of title and h1. The way we put variables here is in two curly brackets.

```
{{title}}

```

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel = 'stylesheet' href = '/css/style.css'/>
    <title>{{title}}</title>
</head>
<body>
    <h1>{{caption}}</h1>
    <img src="./images/picture.jpg"/>
</body>
</html>

```

Now we will work in our index.js file and create a route for our index.hbs

```
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Testing the HTML',
        caption: 'Heyy it\'s working' 
    })
})

```

> ``` .render() ``` tells the express to render the handle bar file name 'index' and it will take an object that will contain the variable names as key and their value.

We made our static site rendering ar /test so we need to update the path in our ``` img ``` and ``` link ``` file to 'test' as well.

```
 <link rel = 'stylesheet' href = 'test/css/style.css'/>

```

```
<img src="test/images/picture.jpg"/>

```



Note that we are rendering the static site at /test we will use the path as test/... if we rendered the static site at '/' we needed to specify the path like this

```
<img src="/images/picture.jpg"/>

```

Run the server and we will find the html page will load with our provided values of title and caption. 

