import { it, expect, describe, afterEach, beforeAll, afterAll } from 'vitest';
import request from 'supertest';

import { server } from './../index.js';
import databaseConfiguration from '../src/database/index.js';
import { testCategory, invalid_ID } from './resources.js';


beforeAll(async () => {
    await databaseConfiguration.databaseInstance.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true }); //allow us to work without constrains
});

afterEach(async () => {
    await databaseConfiguration.databaseInstance.models.categories.truncate({ cascade: true });
});

afterAll(async () => {
    await databaseConfiguration.databaseInstance.query('SET FOREIGN_KEY_CHECKS = 1');
})


describe('GET /categories', () => {

    it('should respond with a 200 status code if there are any categories loaded', async () => {

        await request(server).post('/categories').send(testCategory);
        const response = await request(server).get('/categories').send();
        expect(response.statusCode).toBe(200);
    });

    it('should respond with an array of categories', async () => {

        await request(server).post('/categories').send(testCategory);
        const response = await request(server).get('/categories').send();
        expect(response.body).toBeInstanceOf(Array);
    });

});

describe('GET /categories/id', () => {

    it('should respond with a 200 status code if a valid ID is provided', async () => {

        const category = await request(server).post('/categories').send(testCategory);

        const { id } = category.body;

        const response = await request(server).get(`/categories/${id}`).send();

        expect(response.statusCode).toBe(200);
    });

    it('should respond with a category object', async () => {
        const category = await request(server).post('/categories').send(testCategory);

        const { id } = category.body;

        const response = await request(server).get(`/categories/${id}`).send();

        expect(response.body).toBeInstanceOf(Object);
    });

    it('should respond with a 204 status code if an invalid ID is provided', async () => {
        await request(server).post('/categories').send(testCategory);

        const response = await request(server).get(`/categories/${invalid_ID}`).send();

        expect(response.statusCode).toBe(204);
    });

});

describe('POST /categories', () => {

    it('should respond with an object when provided with a name', async () => {

        const response = await request(server).post('/categories').send(testCategory);

        expect(response).toBeInstanceOf(Object);
    });

    it('should respond with a 405 status code if the category name its already taken', async () => {
        await request(server).post('/categories').send(testCategory);

        const response = await request(server).post('/categories').send(testCategory);

        expect(response.statusCode).toBe(405);
    });

});

describe('PUT /products/id', () => {
    it('should respond with a category object when provided with a valid ID', async () => {

        const category = await request(server).post('/categories').send(testCategory);
        const { id } = category.body;

        const body = {
            name: "Personal Care"
        };

        const response = await request(server).put(`/categories/${id}`).send(body);

        expect(response).instanceOf(Object);
    });

    it('should respond with a 204 status code when provided with an invalid ID', async () => {

        await request(server).post('/categories').send(testCategory);

        const body = {
            name: "Personal Care"
        };

        const response = await request(server).put(`/categories/${invalid_ID}`).send(body);

        expect(response.statusCode).toBe(204);
    });

});

describe('DELETE /products/id', () => {

    it('should respond with a 200 status when provided with a valid ID', async () => {

        const category = await request(server).post('/categories').send(testCategory);
        const { id } = category.body;

        const response = await request(server).delete(`/categories/${id}`).send();

        expect(response.statusCode).toBe(200);

    });

    it('should respond with a 204 status code when provided with an invalid ID', async () => {

        await request(server).post('/categories').send(testCategory);

        const response = await request(server).put(`/categories/${invalid_ID}`).send();

        expect(response.statusCode).toBe(204);
    });
});