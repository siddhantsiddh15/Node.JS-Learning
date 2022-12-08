const  fsPromises = require('node:fs/promises');
const path = require('node:path');

const fileOps = async () => {
  try{
      const data = await fsPromises.readFile(path.join(__dirname, '.', 'starter.txt'), 'utf8');
      console.log(data);
      fsPromises.unlink(path.join(__dirname, '.', 'starter.txt'));
      fsPromises.writeFile(path.join(__dirname, '.', 'promise.txt'), "Overwrote the text ")

      fsPromises.appendFile(path.join(__dirname, '.', 'promise.txt'), "\n\n Appended the text ")

      fsPromises.rename(path.join(__dirname, '.', 'promise.txt'), path.join(__dirname, '.', 'promiseUpdated.txt'))

      const newData = await fsPromises.readFile(path.join(__dirname, '.', 'promiseUpdated.txt'), 'utf8');
      console.log(newData);

  }catch(err){
    console.error(err);
  }
}

fileOps();