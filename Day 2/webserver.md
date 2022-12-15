Our browser contacts the DNS and asks for the url. The DNS searches for the address and returns an IP address to the browser. 

This IP address will let us communicate with the server and allow's the flow of information.

https encrypts our data while transferring so no one sees our data. Ther server often sends data like JSON, XML, Text, Images or Videos.


#### HTTP Requests are made up of these parameters

1.Method : ex- POST
2.PATH : collection or a specific item of the collection. This path is also sometime called as resource
that we are breifly accessing on the backend
3.BODY : Contains the data that we are sending from browser to the server. This could be a plain text but the most common format for sending data back and forth over HTTP is JSON.

example - {text: 'hello', photo: 'smile.jpg'}

Usually we have ** BODY ** on post, put requests and not for delete or get requests because server has all the information it requires for a delete and get requests.

4.HEADERS: This is the 4th part of every single request. These are optional properties that you can specify on a request to send additional metadata to the servers ie. information about the data that we are requesting.

ex: size of the data we are sending, authentication information that we are sending.

These are optional depending on our use case but ** there is one request every single request needs ** . It is the ** Host Header ** which specifies which server your request is being sent to including (sometimes) port number of that site.

#### Responses in HTTP

HTTP responses have 3 main part.

1.Headers : It is optional and tells us the type of data that is being sent in the body of the request.
example - Content-Type: application/json

2.BODY: It contains the data that we are fetching from the server.

example - {text: 'hi!'}

3. STATUS CODE - A request will never containa status code. Status Code tells us whether the request was successful or not. 
Status Code 200 to 299 means successful responses.

### Creating a server

We will start by importing the http module. 

We will need createServer method which will take a callback function which is called a request listener that basically tells the server what to do when it get's a request.

Our system has a an IP address and because the IP address is a difficult thing to remember, our machine has a default name too 'localhost'.
127.0.0.1 is IP address and localhost is it's name.


server.listen() will look for local host. It will take an argument stating the port number our server will be listening on. It will take another argument as a callback function.

We can have different applications running to our machine and port number is used to direct the traffic coming in to the right application to right server on our machine.

Set a PORT like this :

``` const PORT = 3000 ```

Yes, it is just a number. Now our entire server will look like this

```

const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
    })

    res.end('Hello my firent')
})

const PORT = 3000;
server.listen(PORT, () => {
    console.log('server is listening on', PORT)
})

```

Now go to ``` localhost:PORT ``` in your browser and you will see the 'Hello my firent' written there.

#### Getting other file types as response

The ``` 'Content-Type' : ``` is used to specify which kind of file we want to send as our response.

So if we want to send some json file we will write 

``` 
res.writeHead(200, {
        'Content-Type': 'application/json',
    })

```

This will allow us to send a JavaScript object as response.

The res.end() is expected to look like this

```

res.end({
    name:'Siddhant',
    learning:'Node.JS',
    year:2022
})

```

On running the server file you will get an error. This is because .end() function expects a string. 

JavaScript allows us to convert our JSON data into a string using stringify.

```
JSON.stringify({object})

```

So our res.end file will look like this

```
res.end(JSON.stringify({
        name:'Siddhant',
        learning:'Node.JS',
        year:2022
    }))

```

Now run the server file. 

### HTTP APIs and routing

Servers need to respond to different types of request based on some logic ie. different URLs should response to different types of logic. 

.createServer uses 2 parameters, req and res! 

res is request listener which is something equivalent to 

```
server.on('request', () => {
    console.log('logic')
})

```
When we have a server that has multiple different URLs that respond differently depending on which URL is being requested and with what HTTP method (POST, GET, PUT, DELETE etc), in that case we call these different URL as endpoints.

> Each different URL that you can hit is an end point that is responsible for a particular functionality which will be provided by the backend server.

We look at different end points by looking for url from the response.

```
const server = http.createServer((req, res) => {
    if(req.url === '/friends'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify({
            name:'Siddhant'
        }));
    }else if(req.url === '/messages'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<h2>Heyy</h2>');
        res.write('</body>');
        res.write('</html>');
        
        res.end();
    }
})

```

You have noticed some changes in the code 

Instead of writeHead we used the 

```
res.statusCode = number;
res.setHeader()

```

What we wrote in writeHead and above two lines are equivalent code.

res.write() is used when we don't want to end responding to our request. In this example we are responding with an HTML code which is why ** we used setHeader content-type as 'text/html' **

### Parameterized URLs

When we are writing real life servers we will send the data that will come from some database.

In our server, we should be able to run queries for the individual requests and get the data the we need to display to the user.

Consider we have a number of objects to be returned as per requested by the user.

*** localhost:3000/friends/x ***

where x can be any parameter. This is why we call this paramterized URLs or routers.(We will know about it later)

Our urls can go beyond one or two parameters like 

*** friends/x/y/z/name/somethingelse/.. ***

We need to evaluate individual parameters. For that we will split the req.url which is a string by '/'

```
const items = req.url.split('/')

```

Now we won't check req.url instead we will look for items array.

The item at 0th index at item array will be an empty string(always).

We will need to put a check condition now for our res. 

Consider the following request

``` http://localhost:3000/friends/2 ```

On splitting, out items will be have 3 items 

['', 'friends', '2']

We need to route the request as per the last number we are requesting. The code will be like this where we are accessing the item corresponding to the last element of items array.

```
...
else if(items[1] === 'friends'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        if(items.length ===3){
            const idx = Number(items[2]);
            res.end(JSON.stringify(friends[idx]));
        }else{
            res.end(JSON.stringify(friends));
        }
        
    }else if ...

```
This is definitely not recommended for production.Try searching for ``` ``` http://localhost:3000/friends/2 ``` 
and you will find server will not respond at all.

#### Same Origin Policy

Consider the following URL

```
https://www.google.com:443/maps/

```

https part is the *** PROTOCOL ***

www.google.com part is the *** HOST ***

:443 part is the *** PORT ***

Whenever one of the three parts are changed we are no longer on the same origin.

We can change /maps to /email and still be on same origin but we cannot change google.com to facebook.com and be at same origin. 

Similarly changing the protocol will also change the origin. So https and http will be from different origin.

*** Why is this important? ***

Our browser or JavaScript uses the same origin policy.

Same Origin Policy is a security feaure by our browser that restricts what our browser is allowed to load when we are browsing pages on the internet.

It doesn't allow information from a cross-origin domain through JavaScript to protect privacy.

Whereas POST requests from JavaScript is allowed as there is less chance that POST request will steal our data. It is an exception.

Same origin policy is applied to JavaScript and not static HTML tags so we can browse from google to facebook without any restriction.

### CORS

It stands for Cross Origin Resource Sharing. 

As per SOP, we cannot get information from different origins. But if we want to specify certain sites where we require data for our website we need to explicitly specify the ** Access-Control-Allow-Origin: url ** to a list of domains that our site will be making requests to.

Specify ** Access-Control-Allow-Origin: * ** to stop potential all malicious sites to make requests to our domain. 

CORS allows the practice of whitelisting which means allowing only certain domains to make request while blocking every other.

When it comes to security it is always wise to do whitelisting than blacklisting ie. instead of tracking potential malicious sites only track the trusted sites allow operations for them. 

It is the browser that implements the SOP and CORS.