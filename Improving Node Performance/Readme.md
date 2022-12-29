### Delaying the response of our server.

What we will do to delay the response? When multiple requests start coming to our servers to complete each of those requests our server requires some time no matter how fast it is. For that particular time our server response gets blocked to process other incoming requests. 

What can we do to mimic such a delay in our small system?

We will create a function that will take the number of milliseconds required before the server sends the response.

We will create a while loop which will keep track of difference of time between the first time the function was called and the current time. Once the difference exceed the desired time, the loop will exit and our commands will run further

```
app.get('/timer', (req, res) => {
    delay(9000)
    res.send('Ding ding ding');
})

function delay(duration){
    const startTime = Date.now();

    while(Date.now() - startTime < duration){
        /// event loop is locked till we are in loop
    }
}

```

Our event loop won't continue until our delay function returns.

### Real Life blocking function

The real life functions that can cause blocking are

JSON.stringify and JSON.parse where stringify converts an object to a JSON string and parse converts a string to an object. 

Some other functions are sorting functions, there are some functions in crypto module of Node which deals with cryptography and security. 

When it comes to security is desired to have slow, blocking functions than quick, easy to compute function. 

A user feels the system is reacting instantaneously if response time is less than 0.1 sec. 10 seconds is the limit of keeping user attention.

### Running Multiple Node Processes

We can spread our request into multiple node processes where each processes contains a copy of our server code side by side. So when multiple requests come, it can handled with different processes. 

In case we have more requests than processes, each process can handle multiple requests. The server is sharing the load between them by running many processes. 

#### Multiple Node processes running side by side

Our first approach is to use the built-in ** cluster ** module.

Cluster module allows to create copies of the node process that each run our server code side by side in parallel. 


We have a master server code and we have fork() method which makes worker of the master code. Worker code is made using the fork() function. We can make many workers as per the need.

The task is shared using the round robin approach ie. passing the task to the next worker.

### Clustering in action

We will see how we use cluster in our code.


Import cluster. 

```
const cluster = require('cluster');

```

We differentiate between master and worker code by using the ** isMaster ** boolean flag from the cluster module

```
if(cluster.isMaster){
    console.log('Master has been started');
}else{
    console.log('Work process started')
}

```

> We fork two worker from our master code in this example for the two routes we defined. 


```
cluster.fork();

```

We create a new worker every time we call this function. For now we will make 2 forks

```
if(cluster.isMaster){
    console.log('Master has been started');
    cluster.fork();
    cluster.fork();
}

```

We will listen to our app object in the else block that is for our worker process.

cluster understands that the workers are running on the same port.

```
else{
    console.log('Work process started')
    app.listen(3000);
}

```

Process is an in-built module and pid tells about the id of the current process from the O.S. .This will tell us that different processes are handling different requests. 

Complete server.js file will look like this. Run the server using ** npm start ** . 

> Disable the cache in the developer tools of the browser before playing around with end points of server.js

```
const express = require('express')
const cluster = require('cluster');
const app = express();

function delay(duration){
    const startTime = Date.now();

    while(Date.now() - startTime < duration){
        /// event loop is locked till we are in loop
    }
}


app.get('/', (req, res) => {
    res.send(`Performance Example  ${process.pid}`);
})

app.get('/timer', (req, res) => {
    delay(19000)
    res.send(`Ding ding ding  ${process.pid}`);
})

if(cluster.isMaster){
    console.log('Master has been started');
    cluster.fork();
    cluster.fork();
}else{
    console.log('Work process started')
    app.listen(3000);
}

```
See how we are running two worker processes. Remember the code for master as well as server are the same. The isMaster property sets the difference between the master and worker. 


### Maximizing the Cluster Performance

Using clustering cannot solve all our problems. 
Consider we automate our fork creation process. We will use the ** os ** module. 

> To run efficiently each process needs to run on a separate processor on our computer. 

We want to limit the number of workers to the number of cores available on our CPU.


```
const NUM_WORKERS = os.cpus().length();

```
.cpus() tells the number of cores. 

We can create the maximum number of workers logically possible for our machine

```
for(let i =0; i< NUM_WORKERS; i++){
        cluster.fork();
    }

```

### Load Balancing

Load balancing is distributing a set of tasks to a set of resources to make the overall request processing more efficient.

Load balancing applies when you are running multiple servers each handling same kind of request.

Load balancing is used generally when we talk about horizontal scaling.

Vertical scaling involves adding more speed to our one node process. In horizontal scaling we don't need our server to be super fast but we scale our application to handle more requests by adding more servers(adding more node processes in our example).

If we don't know how long a request will take time to complete we take the 'Static Load Distribution' approach.

### PM2 Tool - Process Manager 2 

As per their official documentation, PM2 is a daemon process manager that helps us manage our application online. 

It uses a cluster module so that scaled application child processes can automatically share server ports. 

It has a watch and restart mode. It allows us to start processes if there is some failure in one of our processes. 


Install it using the following command in terminal. It is advised to install it globally so we will use the -g

```
npm i pm2 -g

```

Most basic way to run pm2 is to write

```
pm2 start javascript.file.we.want.to.run.js

```

We can stop our pm2 by typing the following

```
pm2 stop server.js

```

If we want to remove server from the list of processes being managed by pm2 we will write 

```
pm2 delete server

```
pm2 comes with built in cluster module so we can remove any usage of cluster module in our code. We don't need to fork our process as pm2 will do the forking for us. 

We can get rid of entire master block.

We can start our workers through pm2 by writing the following

```
pm2 start server.js -i max

```

max signifies maximum number of worker can be initialized. It can be any number as well.

We can see the current status of our server by using

```
pm2 list 

```

To get a real time view of what is being logged in our server we can use

```
pm2 logs

```
Saving the history of logs for last 100 lines we will use

```
pm2 logs --lines 200

```

### Managing Live CLusters with PM2

We can specify a file name to send our logs to using the following command

```
pm2 start server.js -l logs.txt

```

To specify the number of clusters we want to run we use the -i flag

```
pm2 start server.js -i 2

```

We can know the details of our processes by using the show command and passing in one of the ids of our processes

```
pm2 show process_id

```

We can target a particular process as well using pm2. Consider any process has to be taken down to see the effect on rest of the cluster

```
pm2 stop process_id

```

To get a dashboard in our terminal we use monit command

```
pm2 monit

```
It will open a fancy dashboard in our terminal.

### Zero Downtime Restart using PM2

Consider we made some changes to our server code and there are live users who are using our code. We have to make sure that our application is still available to them while we are making changes.

To avoid server downtime notifications to our user we can do the zero downtime restart.

Instead of shutting down all our processes and re starting all of them we can use the pm2 functionality given to us

```
pm2 reload server

```

This restarts one process at a time, which ensures at least one process is always active for our user. 

Zero Downtime Restarts ensures our application is available to our users all the time.

### Worker Threads in Node

It is a built in module that enables use of threads that executes JavaScript in parallel.

```
const worker = require('worker_threads');

```

Unlike cluster, worker_threads can share memory. It takes a step closer to make JavaScript a multi-threaded language, but not exactly.

Worker_threads help us take advantage of multiple CPU processors in our machine. Unlike cluster module which use processes, worker threads take V8 isolate. 

Cluster makes a master which creates workers using the fork() function.
Worker_threads creates a main thread.

>This main thread can create a worker thread using the new Worker(), just like fork() we can create as many Worker() we want.

>Worker threads are not built such to run a server on one port and distribute incoming requests between each thread. That is specific only to cluster module.

#### Using Worker Thread

We will require the Worker module. To know we are on the main thread we will require isMainThread. 

```
const {isMainThread, Worker} = require('worker_threads');

```

Before creating a new worker thread we will check if we are in our main thread or not

```

if(isMainThread){ 
    new Worker(__filename);
    new Worker(__filename);
}else{
    console.log(`Worker! Process Id : ${process.pid}`);
}

```

The ``` __filename ``` is similar to ``` __dirname ``` .

``` process.pid ``` tells us the id of the process and it is a built-in property.

We will see the process id of both the workers created will be same.

Everything will happen in a single process through worker module.

A sample code explaining worker threads is this

```
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

```

Thanks for reading. 