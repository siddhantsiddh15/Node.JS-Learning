const path = require('path');

function getMessages(req, res){
    
    res.sendFile(path.join(__dirname,'..','public', 'images', 'picture.jpg'))
    
}

function postMessage(req, res){
    console.log('updating messages....')
}

module.exports ={
    getMessages, postMessage
};