const request = require('supertest');
const {
    BASE_URL
} = require('./petstore.config');

describe('Petstore CRUD endpoints', () => {
    const testPetId = Date.now();

    const petPayload = {
        id: testPetId,
        name: 'commit-test-pet',
        category: {
            id: 1,
            name: 'dogs'
        },
        photoUrls: ['https://example.com/photo1.jpg'],
        tags: [{
            id: 1,
            name: 'friendly'
        }],
        status: 'available'
    };

    const updatedPetPayload = {
        ...petPayload,
        name: 'updated-commit-test-pet',
        status: 'sold'
    };

    it('POST /pet should create a new pet and return matching data', async () => {
        const res = await request(BASE_URL)
            .post('/pet')
            .send(petPayload)
            .set('Content-Type', 'application/json');

        expect([200, 201]).toContain(res.status);
        expect(res.body).toHaveProperty('id', petPayload.id);
        expect(res.body).toHaveProperty('name', petPayload.name);
        expect(res.body).toHaveProperty('status', petPayload.status);
        expect(Array.isArray(res.body.photoUrls)).toBe(true);
    });

    it('GET /pet/{petId} should return the created pet', async () => {
        const res = await request(BASE_URL).get(`/pet/${testPetId}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', testPetId);
        expect(res.body).toHaveProperty('name', petPayload.name);
        expect(res.body).toHaveProperty('status', petPayload.status);
    });

    it('PUT /pet should update an existing pet', async () => {
        const res = await request(BASE_URL)
            .put('/pet')
            .send(updatedPetPayload)
            .set('Content-Type', 'application/json');

        expect([200, 201]).toContain(res.status);
        expect(res.body).toHaveProperty('id', updatedPetPayload.id);
        expect(res.body).toHaveProperty('name', updatedPetPayload.name);
        expect(res.body).toHaveProperty('status', updatedPetPayload.status);
    });

    it('GET /pet/{petId} should return updated pet data', async () => {
        const res = await request(BASE_URL).get(`/pet/${testPetId}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', testPetId);
        expect(res.body).toHaveProperty('name', updatedPetPayload.name);
        expect(res.body).toHaveProperty('status', updatedPetPayload.status);
    });

    it('DELETE /pet/{petId} should delete the pet', async () => {
        const res = await request(BASE_URL)
            .delete(`/pet/${testPetId}`)
            .set('api_key', 'special-key');

        expect([200, 204]).toContain(res.status);
    });
});