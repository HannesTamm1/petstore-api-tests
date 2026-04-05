const request = require('supertest');
const {
    BASE_URL
} = require('./petstore.config');
const {
    expectPetShape
} = require('./helpers');

describe('Petstore GET endpoints - functional tests', () => {
    it('GET /store/inventory should return 200 and an object', async () => {
        const res = await request(BASE_URL).get('/store/inventory');

        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
        expect(typeof res.body).toBe('object');
        expect(Array.isArray(res.body)).toBe(false);
    });

    it('GET /pet/findByStatus?status=available should return 200 and an array', async () => {
        const res = await request(BASE_URL)
            .get('/pet/findByStatus')
            .query({
                status: 'available'
            });

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);

        if (res.body.length > 0) {
            expectPetShape(res.body[0]);
        }
    });

    it('GET /pet/findByStatus should support query parameters with multiple values', async () => {
        const res = await request(BASE_URL)
            .get('/pet/findByStatus')
            .query({
                status: ['available', 'pending']
            });

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET /pet/1 should return 200 or 404 depending on data, but never a malformed response', async () => {
        const res = await request(BASE_URL).get('/pet/1');

        expect([200, 404]).toContain(res.status);

        if (res.status === 200) {
            expectPetShape(res.body);
        }

        if (res.status === 404) {
            expect(res.body).toBeDefined();
        }
    });
});