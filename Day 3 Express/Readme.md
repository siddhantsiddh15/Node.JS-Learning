### Getting started with Express

We will start by installing Express. Use the following command and it will install Express :

```
npm i express

```

If your folder is not having package.json folder you need to run ``` npm init ``` or ``` npm -y init ```first.

After running ``` npm i express ``` we will have node_modules folder with express in it and all the dependencies on which express depends to create a server.

** Create index.js file **

We will start by importing the express module and create an app object out of it.

```
const express = require('express');

const app = express();

const PORT = 3000;

```

Similar to Node.JS we will use .listen() to our app object and will pass the port number and a callback function.

```

app.listen(PORT, () => {
    console.log('Server is listening at PORT', PORT)
})

```
We have initialized the project with npm so we can run ``` npm run ``` to start our server.

But it will throw an error as we need to write the start script in our package.json file.

```
"scripts": {
    "start" : "node index",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

```

Now run npm start and the following line will be logged into console

*** Server is listening at PORT 3000 ***

Express is very good at routing. 
If we want to respond to some process we can use app object and use the method post, get.

```
app.get('/', (req, res) => {

    res.send('Hello');
})


app.get('/JSON', (req, res) => {
    res.send(
    {name:'Siddhant',
    id: 1}
    )
})

app.get('/messages', (req, res) => {
    res.send('<ul><li>Heyy Newton</li></ul>')
})

app.post('/messages', (req, res) => {
    console.log('updating messages....')
})

```

When we want respond to GET request we can use ``` res.get(PATH, RESPOND-HANDLER) ``` in Express. ** The res and req are not same as that we saw in Node.JS *** . Here if we want to send a response we simply use res.send(). 

The great thing about Express is that it sets the content-type and status code automatically here. Is we pass a JSON object in our send method it will interpret on it's own. *** You can see that in Network -> Header part on clicking inspect option in browser ****

The code is lot simpler now. What Express is doing is looking for code one by one and executes where it finds the match. If it doesn't get any match it will give an error 404 status on it's own.

Some features of Express :

1. Robust Routing
2. Focus on high performance
3. Super-high test coverage
4. HTTP helpers(redirection, caching, etc)
5. Executable for generating applications quickly.

Express uses a feature called as ' ** Middleware ** ' and middleware allows us to manipulate how process requests coming in and responses
 going out.

### Route Parameters

When sending json object in through Express we can specify it using the .json() function..

We have seen we use the res.send() and express automatically recognizes the content type. But we can also send ** req.json(data) ** , now the data that we send will treated as a json object always.

Consider we passed this array friends = ``` [
    {name:'Siddhant',
    id: 0},
    {name:'Amit',
    id:1
    }]

```
we want our browser to show first friend so how we will do that? In Node we processed the string that we got but in express we have a better way

```
app.get('/friends/:friendID', HANDLER)

```

The ' : ' will let express parse whatever will come after friends as a friendID and will show the corresponding id from the array. 

Now before processing the request it is always important to validate the input received from the user.

For a url friends we can write the followng code

```
app.get('/friends/:friendID', (req, res) => {
    const friendID = req.params.friendID - 0;
    const friend = friends[friendID];
    if(friend){
        res.status(200).json(friend);
    }else {
        res.status(404).json({
            error: 'friend doesnot exist'
        })
    }
})

```

*** Note *** the else block that we wrote setting the status and chaining the json response with it.

Express looks for the url and will match with friends but! once it is inside the .get() code block if it doesnot find anything that matches our url, ** the server will never respond ** . This will throw a bug and thus if you don't put an else block the server will keep on loading.

``` res.status() ``` sets the status code and ``` res.json() ``` sends a json object.

### Postman and Insomnia


#### Postman 

To test our API, Postman is the right tool for the job.

Postman allows us to create HTTP requests, organzie them and share them into a team. 
- It provides some useful features like integration with REST, GraphQL. 
- It also provides automated testing so we can test our APIs
- Allows us to develop our frontend against a backend that hasn't been developed yet means we can have our frontend running without backend being completely implemented.

#### Insomnia

It is a competitor to Postman with similar features while Insomnia has simple UI

Lee's checkout postman.Go to this site 

> https://www.postman.com/downloads/ 

Download the Postman and create a free account.

Let's start by creating a ** Collection **

Click on the *** Collections *** and press + to create a new collection.

1. Name the collection Express Example.
2. After that, add a request in the Express Example collection.
3. Name it GET friends
4. Click on GET friends, select request type to GET and enter the url and click send, ``` http://localhost:3000/friends ```

** NOTE ** Select BODY, click on raw and select JSON. You will see the following result 

```
[
    {
        "name": "Siddhant",
        "id": 0
    },
    {
        "name": "Amit",
        "id": 1
    }
]

```

We can make any HTTP request using Postman and thus it is a very powerful tool for API testing.


> What is dev dependencies? 

These are npm modules that are needed only while developing our project and not while running our project.


### Middleware

Middleware are the special functions that run in between or in middle of the request coming in and the response coming out of aur API.

When a request comes in Express, it flows through all middleware sequentially, until the response is set and returned back to the client.

#### How the middleware function looks like?

It starts will ``` app ``` object and we use the .use function which will register our middleware with Express.

We then pass a function inside the .use() which has three parameters *** req, res, next ***

```
app.use(function(req,res,next){

})
```

The next parameter here allows us to call the next middleware.

The middleware function keeps calling other middleware to process the req until they come to an end point. There the middleware matches the exact url and then there is no downstream calls to middleware.

It will use app.METHOD instead of app.use as it is at the last of middleware chain and it sets the res body and sends the response upstream.

### Writing our own logging Middleware

We will start by writing the following code

```
app.use((req, res,next) => {
    console.log(`${req.method} ${req.url}`);

    next();
})

```

Now open Postman to check our middleware is working.

Create a new request GET one friend and enter the url ``` http://localhost:3000/friends/0 ``` and click send. 

You will see that we got a response.

Now in our code block, comment the next() function and send the request again in Postman. You will see that we don't get a response now. 

This is because without next Express never sends the response to our handlers.

To measure the time elapsed between our req and response write the following code

```
app.use((req, res,next) => {
    const start = Date.now();
   

    next();
    const delta = Date.now() - start; // calculated time elapsed

    console.log(`${req.method} ${req.url} ${delta}ms`);
})

```

When our req is made, we calculate our time. The next() function directs it to the next middleware, here there is no other middleware so it goes directly to app.METHOD which is app.get(). Once app.get() sends back our response we calculate the delta which tells the time difference between req and res and then we log it into our cosnole.

We made our own middleware now let's see the middleware provided by Express.

#### Middlewares by Express

Start by making a post request.

express.json() will be used here to parse every input data as a JSON. 

Put the middleware befor the post method like this 

```
app.use(express.json());

app.post('/friends', (req, res)=> {

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
})

```

Now go in Postman and make a new request and name it POST friends.

Set the type of this request to POST, set the type to raw and change text to json.

Enter the input in this format as we are taking the JSON format  only

```
{
    "name":"Arjun:
}

```

There is a check in starting of our code which checks the presence of name property in our client side input. This check will be common in form validation quite often. 