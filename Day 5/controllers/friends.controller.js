const {friends}  = require('../models/friends.models')



function getFriends(req, res){
    res.json(friends)
}


function postFriends(req, res){

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
}

function getFriend(req, res) {
    const friendID = req.params.friendID - 0;
    const friend = friends[friendID];
    if(friend){
        res.status(200).json(friend);
    }else {
        res.status(404).json({
            error: 'friend doesnot exist'
        })
    }
}



module.exports = {
    getFriends,
    postFriends,
    getFriend,

}