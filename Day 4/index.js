const express = require('express');

const friendsController = require('./controllers/friends.controller')
const messagesController = require('./controllers/messages.controller')
const app = express();

const PORT = 3000;

app.use((req, res,next) => {
    const start = Date.now();
   

    next();
    const delta = Date.now() - start; // calculate time elapsed

    console.log(`${req.method} ${req.url} ${delta}ms`);
})

app.use(express.json());

app.listen(PORT, () => {
    console.log('Server is listening at PORT', PORT)
})

app.post('/friends', friendsController.postFriends)
app.get('/friends', friendsController.getFriends)
app.get('/friends/:friendID', friendsController.getFriend)



app.get('/', (req, res) => {

    res.send('Hello');
})

app.get('/messages', messagesController.getMessages)
app.post('/messages', messagesController.postMessage)



