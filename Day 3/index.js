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