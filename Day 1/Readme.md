### Complete NodeJS Developer in 2023 Udemy Course- Day 1


There is something consistent throughout the Node and that is callback function is the last argument passed in any asynchronous function.


#### HTTP example

We start by importing the http module in our code.

After that we will make a request on it.

```
const http = require('http')

const req = http.request('http://www.google.com', (res) => {
    res.on('data', (chunk) => {
        console.log('Data Chunk ', chunk)
    })

    res.on('end', () => {
        console.log('No more data')
    })
})

req.end();

```

request took url as first parameter. Second parameter is a callback function. res is response for the request that we made to the url. 

We get data back from our response by using the .on function.

.on function will take string as a first argument and a callback function. It will be similar to an event emitter. 

The string that we are listening on for is 'data' and data has a parameter chunk. We will console log this chunk for now.

The other event on which .on will emmit is 'end'. It is done when data stops coming from the request. It does not have a parameter.

req.end() is very important as it will trigger the function call. Running the program without req.end() won't give you any result in your console.

#### Using HTTPS instead of HTTP

If we will ask for ``` https://www.google.com ``` it will give a Invalid Potocol error. 

This is because we imported http module. 
To use the https module we need to import https because  https communicates securely and Node uses separate module for http and https.

The updated code will look like this

```
const http = require('https')

const req = http.request('https://www.google.com', (res) => {
    res.on('data', (chunk) => {
        console.log('Data Chunk ', chunk)
    })

    res.on('end', () => {
        console.log('No more data')
    })
})

req.end();

```

### Destructuring our imports

When we know what we are going to use from a module it is wise to destructure our imports.

Like we are using the request function a lot so we can refactor our code like this 

```
const {request} = require('https')

const req = request('https://www.google.com', (res) => {
    res.on('data', (chunk) => {
        console.log('Data Chunk ', chunk)
    })

    res.on('end', () => {
        console.log('No more data')
    })
})

```

The code will still work and we will exactly know which functions are being used.

When we are getting data from server and not sending any, https has another function called GET.

So we can use that as well. Now since we destructured our code we can replace request by 'get' easily.

```
const {get}  = require('https);

const get = get(url, () => {

})

```
The benefit of using GET over request is we don't need to call the .end() function. *** GET *** calls it on it's own.

Since we don't need to call .end now we can get rid of our req variable. Our code will still work with get function only. This is how our code will look

```
const {get} = require('https')

get('https://www.google.com', (res) => {
    res.on('data', (chunk) => {
        console.log('Data Chunk ', chunk)
    })

    res.on('end', () => {
        console.log('No more data')
    })
})

```
Till now we have not downloaded anything except inbuilt-node functionalities. Let's look how we can create our own modules

### Creating our own Node modules

We have used an existing module 'https' which was written by NodeJS creators.

Create a folder Modules-Example to getting started with creating our own module. You can name the folder anything.

Node treats every file as a separate module.

Let's try making a module skeleton ourself.

*** Make 3 files - https.js, request.js and response.js ***

Out https.js file will contain a ``` request ``` function that will take a url and data as parameters.

Inside the request function we will send tge 'data' and 'url' received to another function inside request.js file

The request.js file will first encrypt the data. So we will make a send function and an encrypt function in request.js . Now these functions won't do the actual encrypting but just will contain the basic skeleton how the module will work.

*** request.js ***

```
const {get} = require('https')

get('https://www.google.com', (res) => {
    res.on('data', (chunk) => {
        console.log('Data Chunk ', chunk)
    })

    res.on('end', () => {
        console.log('No more data')
    })
})

```
 *** response.js ***

 ```
 function read(){
    return decryp('data');
}

function decrypt(data){
    return 'decrypted data'
}

```
*** https.js ***

```
```

module is a global built-in that contains data from the current module. If you will do console.log(module) inside any file it will return number of properties. 

One of them is exports. This object is used to specify which functions and variables will be available for other files to be use.

So at the end of ``` require.js ``` write the following lines of code

```

module.exports = {
    send
}


```

Now in ``` https.js ``` import this module like this

```
const request = require('./request');

```
Similarly export read function from response.js and update the https.js file like this

```
const request = require('./request');
const response = require('./response')
function makeRequest(url, data){
    request.send(url, data);
    return response.read();
}

const res = makeRequest('https://google.com', 'Hello')

console.log(res)

```

Now run the file. This is how we can make our own custom module in Node. 

