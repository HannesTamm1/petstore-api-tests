const request = require('supertest');
const {
    BASE_URL
} = require('./petstore.config');

describe('Petstore negative and edge case tests', () => {
    it('GET /pet/findByStatus with invalid status should return 400 or a handled response', async () => {
        const res = await request(BASE_URL)
            .get('/pet/findByStatus')
            .query({
                status: 'invalid-status-value'
            });

        expect([200, 400]).toContain(res.status);

        if (res.status === 200) {
            expect(Array.isArray(res.body)).toBe(true);
        }
    });

    it('GET /pet/invalid should return 404 for non-numeric path parameter', async () => {
        const res = await request(BASE_URL).get('/pet/invalid');

        expect(res.status).toBe(404);
    });

    it('GET /pet/-1 should return an error status for boundary-breaking pet id', async () => {
        const res = await request(BASE_URL).get('/pet/-1');

        expect([400, 404]).toContain(res.status);
    });

    it('POST /pet with missing required fields should be handled by the API', async () => {
        const invalidPayload = {
            id: Date.now(),
            status: 'available'
        };

        const res = await request(BASE_URL)
            .post('/pet')
            .send(invalidPayload)
            .set('Content-Type', 'application/json');

        expect([200, 400, 405, 500]).toContain(res.status);

        if (res.status === 200) {
            expect(res.body).toHaveProperty('id', invalidPayload.id);
        }
    });

    it('PUT /pet with invalid payload should return an error status', async () => {
        const invalidPayload = {
            id: 'not-a-number',
            name: '',
            photoUrls: 'not-an-array',
            status: 'unknown'
        };

        const res = await request(BASE_URL)
            .put('/pet')
            .send(invalidPayload)
            .set('Content-Type', 'application/json');

        expect([400, 405, 500]).toContain(res.status);
    });

    it('DELETE /pet/0 should return an error for edge-case path parameter', async () => {
        const res = await request(BASE_URL)
            .delete('/pet/0')
            .set('api_key', 'special-key');

        expect([400, 404]).toContain(res.status);
    });

    it('GET /store/order/0 should return 400 for orderId below minimum boundary', async () => {
        const res = await request(BASE_URL).get('/store/order/0');

        expect([400, 404]).toContain(res.status);
    });

    it('GET /store/order/11 should return 404 for orderId outside documented success range', async () => {
        const res = await request(BASE_URL).get('/store/order/11');

        expect([400, 404]).toContain(res.status);
    });

    it('GET /user/login without required query params should be handled by the API', async () => {
        const res = await request(BASE_URL).get('/user/login');

        expect([200, 400, 404]).toContain(res.status);

        if (res.status === 200) {
            expect(typeof res.text).toBe('string');
        }
    });

    it('GET /user/login with query params should return 200 and expected headers', async () => {
        const res = await request(BASE_URL)
            .get('/user/login')
            .query({
                username: 'testuser',
                password: 'testpass'
            });

        expect(res.status).toBe(200);
        expect(typeof res.text).toBe('string');
        expect(res.headers).toHaveProperty('x-expires-after');
        expect(res.headers).toHaveProperty('x-rate-limit');
    });
});