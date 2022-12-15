const express = require('express');

const app = express();

const PORT = 3000;
const friends = [
    {name:'Siddhant',
    id: 0},
    {name:'Amit',
    id:1
    }];

app.use((req, res,next) => {
    const start = Date.now();
   

    next();
    const delta = Date.now() - start; // calculate time elapsed

    console.log(`${req.method} ${req.url} ${delta}ms`);
})

app.use(express.json());

app.post('/friends', (req, res)=> {

    if(!req.body.name){
       return  res.status(400).json({
            error: 'Missing friend name'
        })
    }
    const newFriend = {
        name: req.body.name,
        id:friends.length
    }

    friends.push(newFriend);

    res.json(newFriend)
})
app.listen(PORT, () => {
    console.log('Server is listening at PORT', PORT)
})

app.get('/', (req, res) => {

    res.send('Hello');
})

app.get('/messages', (req, res) => {
    res.send('<ul><li>Heyy Newton</li></ul>')
})

app.get('/friends', (req, res) => {
    res.json(
    friends
    )
})

app.get('/friends/:friendID', (req, res) => {
    const friendID = req.params.friendID - 0;
    const friend = friends[friendID];
    if(friend){
        res.status(200).json(friend);
    }else {
        res.status(404).json({
            error: 'friend doesnot exist'
        })
    }
})

app.post('/messages', (req, res) => {
    console.log('updating messages....')
})