#### POSTing data to the server


*** find complete code of index.js at end of the blog ***

To submit data to the server we often use two request methods

1. POST
2. PUT

Post method adds the new data but Put method replaces the current data. 

Mostly we use Post request and Put request can be replaced by DELETE request.

We can differentiate between GET and POST or other methods by using req listener and search for methods.

```
if(req.method === 'POST'){

    }else if(req.method === 'GET'){
        
    }
```

Inside the 'POST' block we will put an on listener on req and will set it to listen for data.

```
if(req.method === 'POST'  && items[1] === 'friends'){
        req.on('data', data => {
            const friend = data.toString();
            console.log(friend);
        })
    }

```

We jsut logged that we will be getting from POST but it will come as node stream, to read it as string we use the .toString() function.

For now we assume the data sent to server is in form of JSON.

We will parse our JSON string and then push it to our browser.

The only thing remaining now is to test it in our browser.

```
friends.push(JSON.parse(friends));

```

Run this file and now go the browser and open console. Write the following fetch request and press enter

```
fetch('http://localhost:3000/friends',{
    method: 'POST',
    body: JSON.stringify({id:4, name:'Sid'})
})

```
We used JSON.stringify as fetch function expects a string and not an object.

You will see the following in VS code terminal

```
fetch('http://localhost:3000/friends',{
    method: 'POST',
    body: JSON.stringify({id:4, name:'Sid'})
})

```

### Echoeing back the data we gave to the server.

What to do when we want to get the data we sent through ** POST **

req is a readable stream and res is a writable stream. It is possible to pipe the output of req and res and data will flow straight from the req to res.

This is how you can see it

```
readable.pipe(writable);
req.pipe(res);

```

So we pass some JSON data to the readable stream (req here) and pipe it to writable stream (res here).

This is a powerful thing as we can take data from the server and pass it down to somewhere else.

Now make the same fetch request again in the browser console that we made earlier.

```
fetch('http://localhost:3000/friends',{
    method: 'POST',
    body: JSON.stringify({id:4, name:'Neo'})
}).then(response => response.json()).then(friend => console.log(friend))

```
Make sure to pipe the res to req after the .on listener has finished processing the data or else an incomplete data will be piped to the res and it will throw an error.

```
 if(req.method === 'POST'  && items[1] === 'friends'){
        req.on('data', data => {
            const friend = data.toString();
            console.log(friend);
            friends.push(JSON.parse(friend));
            
        })
        req.pipe(res);
    }
```

Notice that there is no need to end the response after the pipe function. This is because response will end when request will end.

```
// Contains code for POSTing data to server

const http = require('http');
const friends = [
    {
        id:0,
        name:'Sam'
    },
    {
        id:1,
        name:'Rock'
    },
    {
        id:2,
        name:'Jack'
    }
]

const server = http.createServer((req, res) => {
    const items = req.url.split('/');

    if(req.method === 'POST'  && items[1] === 'friends'){
        req.on('data', data => {
            const friend = data.toString();
            console.log(friend);
            friends.push(JSON.parse(friend));
            
        })
        req.pipe(res);
    }else if(req.method === 'GET' && req.url === '/' || req.url === ''){
        res.statusCode = 200;
        res.end('Welcome. Search these : friends, home, test ');
        
    }else if(req.method === 'GET' && items[1] === 'friends'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        if(items.length ===3){
            const idx = Number(items[2]);
            res.end(JSON.stringify(friends[idx]));
        }else{
            res.end(JSON.stringify(friends));
        }
        
    }else{
        res.statusCode= 404;
        res.end();
    }
})

const PORT = 3000;
server.listen(PORT, () => {
    console.log('server is listening on', PORT)
})

```