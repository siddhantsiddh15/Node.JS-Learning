// Contains code for understanding parameterized URLs

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

    if(items[1] === 'home'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');

        res.end('Welcome to Home');
    }else if(req.url === '/' || req.url === ''){
        res.statusCode = 200;
        res.end('Welcome. Search these : friends, home, test ');
        
    }else if(items[1] === 'friends'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        if(items.length ===3){
            const idx = Number(items[2]);
            res.end(JSON.stringify(friends[idx]));
        }else{
            res.end(JSON.stringify(friends));
        }
        
    }else if(items[1] === 'test'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<h2>Heyy</h2>');
        res.write('</body>');
        res.write('</html>');
        
        res.end();
    }else{
        res.statusCode= 404;
        res.end();
    }
})

const PORT = 3000;
server.listen(PORT, () => {
    console.log('server is listening on', PORT)
})