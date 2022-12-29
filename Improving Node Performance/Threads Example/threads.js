const {isMainThread, Worker, workerData} = require('worker_threads');


if(isMainThread){
    console.log(`Main Thread! Process Id : ${process.pid}`);
    new Worker(__filename, {
        workerData: [1,4,2,0]
    });

    new Worker(__filename, {
        workerData: [6,4,5,2]
    });

}else{
    console.log(`Worker! Process Id : ${process.pid}`);
    console.log(workerData, "sorted value is ", workerData.sort())
}

