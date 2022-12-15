const http = require('http');

// const server = http.createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'application/json',
//     })

//     res.end(JSON.stringify({
//         name:'Siddhant',
//         learning:'Node.JS',
//         year:2022
//     }))
// })

const server = http.createServer((req, res) => {
    if(req.url === '/home'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');

        res.end('Welcome to Home');
    }else if(req.url === '/' || req.url === ''){
        res.statusCode = 200;
        res.end('Welcome. Search these : product, home, test ');
        
    }else if(req.url === '/product'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify({
            name:'Medicine',
            price: '100'
        }))
    }else if(req.url === '/test'){
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