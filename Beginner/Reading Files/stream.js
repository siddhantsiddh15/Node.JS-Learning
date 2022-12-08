const fs = require('fs');

const rs = fs.createReadStream('./lorem.txt', {encoding: 'utf8'});

const ws = fs.createWriteStream('./new-lorem.txt');

//listen to data coming from the stream usinf rs.on()
// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk)
// })

rs.pipe(ws)