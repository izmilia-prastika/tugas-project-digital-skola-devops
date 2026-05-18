const request = require('supertest');
const app = require('../app');

describe('Notes API', () => {
    it('GET /notes should return 200 and an array', async () => {
        const res = await request(app).get('/notes');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET / should return status ok', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('ok');
    });

    it('POST /notes should create a note and return 201', async () => {
        const res = await request(app)
            .post('/notes')
            .send({ title: 'Test', body: 'Content' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
    });
});
