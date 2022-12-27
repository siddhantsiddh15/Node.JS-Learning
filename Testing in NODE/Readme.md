### API Testing 

API testing comes above the Unit Tests in the testing pyramid. 

Unit Tests will be done when our code is tested in isolation for any particular functionality. GUI tests mean we will test our application by testing with the UI ie. front end and make requests against the API.

API Testing includes testing the requests coming in, going through all our middleware, being processed by our request handler and being sent back as a response. API tests are also called integration tests. 

### Writing API tests in our node

We need a set of tools that work together to test our code

1 . Test Runner - It finds our tests in our projects, runs through them and gives us the results

2 . Test fixtures - Fixture is how our tests are set up and organized by module and by individual tests, where each test fixture can run in its own environment with it's own sets of variables and data

3 . Assertions - These are functions that allow us to check expected results. 

4 . Mocking - Consider we have a database and we have 100s of tests that do CRUD operations on data in the database, we don't want our database to get affected, so we mock our database where any operation while testing won't affect our database. Mocks allow us to replace or remove certain functionalities when we are testing. 

We have an npm package that includes all the 4 above mentioned packages for testing and is widely used as well. It is Jest. It works on both our frontend and backend. 

Install Jest using the following command 

``` npm install jest -D ```

It is installed as a dev dependency. Now since Jest is installed we can use our test script from our package.json file. 

``` "test": "jest", ```

For now we will run the jest ony. The jest will go through our file folder and look for any tests and will run it. 


#### Organizing our tests

We can do it in few ways, one of which is ** creating a folder named __tests__ ** . This folder will contain all our tests for all our code.

The other way is writing our tests alongside any modules that we are testing. 

Usual naming convention is 

*** launches.spec.js *** or *** launches.test.js *** 

It is better to keep related code together so we can keep our tests in the same folder as our launches code. 

### Writing the tests

We can use the describe() function and pass the description of our tests and second argument will be a callback function.

```
describe('Test GET /launches', () => {
    test('It should respond with 200 success', () => {
        const response = 200;
        expect(response).toBe(200);
    })
});

```

expect() and toBe() are assertions expecting the particular behaviors. Jest knows where to find these describe and expect and toBe function when we run the jest command. 

``` "test-watch": "jest --watch", ```

This jest --watch our test will re run any time our launches  route get updated. It makes it easier to check our code is breaking or not. 

This [link](https://jestjs.io/docs/api) provides the method provided by Jest. This is the official documentation so it may come in handy. 

### Making requests and testing the response using 

We use ** SuperTest ** library. It allows making us API requests against Node HTTP server. 

``` npm i supertest -D ```

Now import the supertest in our test files. 

```
const request = require('supertest');

```
We are naming it as request as supertest will be making requests. Now call the request inside the describe body like this 

```
const response = request(app);

```

This app is the express object that we had created earlier

```
const app = express()

module.exports = {app}

```

#### How do we make requests?

We call the corresponding method on the request call. 
Consider we had a get request for our launches endpoint so we will call our request like this

```
const response = request(app).get('/launches');

```

Now all this is an async work so we will wrap our call back function as async await. Our testfor launches will look like this

```
describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app).get('/launches');
        expect(response.statusCode).toBe(200);
    })
});

```

Now run the test script in terminal.

### Supertest Assertions

We wrote the expect assertion in Jest way but supertest also provides it's own set of assertions that we can use

```
const response = await request(app)
        .get('/launches')
        .expect(200)
        ;

```
We used the .expect() method to get status code and it will do the same job as previous piece of code.

### Testing POST requests using Supertest

We know we will have to wrap our test in async-await. 

We will for this example will use the 
1 . post()
2 . send()
3. expect()

post will take the endpoint '/launches'

send will take an object 

expect will take the result expected

```
describe('Test POST /launch', () => {
    test('It should respond with 201 success', async () => {
        const response = await request(app)
        .post('/launches')
        .send({
            "mission": "ZTM159",
            "rocket": "ZTM Experimental IS9",
            "target": "Kepler-186F",
            "launchDate": "July 1, 2028"
        })
        .expect(201)
        .expect('Content-Type', /json/)
    })

```

Whenever we are testing our body we will use the jest assertion.

 We got stuck at the launchDate key while writing the code. We will test the response body for correct date.


We will first convert our date that we are sending to a data object by passing it as argument in Date() and then take the numeric value of the Date() object using valueOf()

```

const requestDate = new Date(completeLaunchData.launchDate).valueOf();

```

We will do the same for response date as well

```
const responseDate  = new Date(response.body.launchDate).valueOf()

```
These two dates should be now equal so we will use the expect method now

```
expect(responseDate).toBe(requestDate);

```
The objects being reffered here

```
const completeLaunchData = {
        "mission": "ZTM159",
        "rocket": "ZTM Experimental IS9",
        "target": "Kepler-186F",
        "launchDate": "July 1, 2028"
    }

    const launchDataWithoutDate = {
        "mission": "ZTM159",
        "rocket": "ZTM Experimental IS9",
        "target": "Kepler-186F",
        
    }

```
The entire test for our launches endpoint will be like this

```
const request = require('supertest');

const {app} = require('../../app');

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        // const response = await request(app).get('/launches');
        // expect(response.statusCode).toBe(200);

        const response = await request(app)
        .get('/launches')
        .expect(200)
        .expect('Content-Type', /json/);
    })
});

describe('Test POST /launch', () => {

    const completeLaunchData = {
        "mission": "ZTM159",
        "rocket": "ZTM Experimental IS9",
        "target": "Kepler-186F",
        "launchDate": "July 1, 2028"
    }

    const launchDataWithoutDate = {
        "mission": "ZTM159",
        "rocket": "ZTM Experimental IS9",
        "target": "Kepler-186F",
        
    }

    test('It should respond with 201 success', async () => {
        const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect(201)
        .expect('Content-Type', /json/)

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();

        const responseDate  = new Date(response.body.launchDate).valueOf()

        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(launchDataWithoutDate)
    })

    test('It should catch missing required property', async () => {
        const response = await request(app)
        .post('/launches')
        .send({
            "mission": "ZTM159",
            "rocket": "ZTM Experimental IS9",
            "target": "Kepler-186F",
            
        })
        .expect(400)
        .expect('Content-Type', /json/)


        expect(response.body).toStrictEqual({
            error: 'Missing required launch property'
        })
    })

    test('It should catch invalid dates', async () => {
        const response = await request(app)
        .post('/launches')
        .send({
            "mission": "ZTM159",
            "rocket": "ZTM Experimental IS9",
            "target": "Kepler-186F",
            "launchDate": "Anil 1, 2028"
        })
        .expect(400)
        .expect('Content-Type', /json/)


        expect(response.body).toStrictEqual({
            error: "Invalid Date"
        })
    })
})

```

You can find the entire code in this [repository](https://github.com/siddhantsiddh15/Node.JS-Learning/tree/main/NASA%20Project)

Thanks for reading




