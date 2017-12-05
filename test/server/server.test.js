const request = require('supertest')

const app = require('../../server')

describe('loading express', () => {

    it('Doesn\'t respond to /', (done) => {
        request(app)
            .get('/')
            .expect(404, done)
    });

    it('route for getweatherdata with no arguments doesn\'t exist', (done) => {
        request(app)
            .get('/api/getweatherdata/')
            .expect(404, done)
    });

    it('getweatherdata call fails with incorrect arguments', (done) => {
        request(app)
            .get('/api/getweatherdata/a,v')
            .expect(400, done)
    });

    it('getweatherdata call returns location data', (done) => {
        request(app)
            .get('/api/getweatherdata/53.4186504,-2.2391706')
            .expect(200, done)
    });
});
