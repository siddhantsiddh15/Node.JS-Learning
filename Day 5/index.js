const express = require('express');
const path = require('path');

const friendsController = require('./controllers/friends.controller')
const messagesController = require('./controllers/messages.controller')
const {friendsRouter} = require('./routes/friends.router')
const {messagesRouter} = require('./routes/messages.router')
const app = express();


app.set('view engine', 'hbs'); 
app.set('views', path.join(__dirname, 'views'));

const PORT = 3000;

app.use((req, res,next) => {
    const start = Date.now();
   

    next();
    const delta = Date.now() - start; // calculate time elapsed

    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
})
 

app.use('/test',express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Testing the HTML',
        caption: 'Heyy it\'s working' 
    })
})

app.listen(PORT, () => {
    console.log('Server is listening at PORT', PORT)
})

app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);


// app.get('/', (req, res) => {

//     res.send('Hello');
// })





