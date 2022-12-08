const request = require('./request');
const response = require('./response')
function makeRequest(url, data){
    request.send(url, data);
    return response.read();
}


const res = makeRequest('https://google.com', 'Hello')

console.log(res)