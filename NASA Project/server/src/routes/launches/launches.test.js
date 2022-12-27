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