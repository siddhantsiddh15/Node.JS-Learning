const fs = require('fs');
const path = require('path');


fs.readFile(path.join(__dirname, '.', 'starter.txt'),'utf8', (err, data) => {
    if(err)throw err;

    else console.log(data)

})

fs.writeFile(path.join(__dirname, '.', 'replyNew.txt'),'Heyy I replied', (err) => {
    if(err)throw err;

    else console.log('Write completed')

    
    fs.appendFile(path.join(__dirname, '.', 'replyNew.txt'),'\n\nHeyy I replied again hero', (err) => {
        if(err)throw err;

        else console.log('Write completed for append')

        fs.rename(path.join(__dirname, '.', 'replyNew.txt'), path.join(__dirname, '.', 'reply.txt') , (err) => {
            if(err)throw err;
    
            else console.log('Rename completed for replyNew')
    
        })

    })

})


