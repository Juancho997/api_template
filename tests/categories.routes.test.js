import { it, expect, describe, afterEach, beforeAll, afterAll } from 'vitest';
import request from 'supertest';

import { app } from '../index.js';
import {databaseInstance} from '../src/database/index.js';
import { testCategory, invalid_ID } from './resources.js';


// beforeAll(async () => {
//     await databaseConfiguration.databaseInstance.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true }); //allow us to work without constrains
// });

afterEach(async () => {
    await databaseInstance.models.category.truncate(/*{ cascade: true }*/);
});



describe('GET /categories', () => {

    it('should respond with a 200 status code if there are any categories loaded', async () => {

        await request(app).post('/categories').send(testCategory);
        const response = await request(app).get('/categories').send();
        expect(response.statusCode).toBe(200);
    });

    it('should respond with an array of categories', async () => {

        await request(app).post('/categories').send(testCategory);
        const response = await request(app).get('/categories').send();
        expect(response.body).toBeInstanceOf(Array);
    });

});

describe('GET /categories/id', () => {

    it('should respond with a 200 status code if a valid ID is provided', async () => {

        const category = await request(app).post('/categories').send(testCategory);

        const { id } = category.body;

        const response = await request(app).get(`/categories/${id}`).send();

        expect(response.statusCode).toBe(200);
    });

    it('should respond with a category object', async () => {
        const category = await request(app).post('/categories').send(testCategory);

        const { id } = category.body;

        const response = await request(app).get(`/categories/${id}`).send();

        expect(response.body).toBeInstanceOf(Object);
    });

    it('should respond with a 204 status code if an invalid ID is provided', async () => {
        await request(app).post('/categories').send(testCategory);

        const response = await request(app).get(`/categories/${invalid_ID}`).send();

        expect(response.statusCode).toBe(204);
    });

});

describe('POST /categories', () => {

    it('should respond with an object when provided with a name', async () => {

        const response = await request(app).post('/categories').send(testCategory);

        expect(response.body).toBeInstanceOf(Object);
    });

    it('should respond with a 405 status code if the category name its already taken', async () => {
        await request(app).post('/categories').send(testCategory);

        const response = await request(app).post('/categories').send(testCategory);

        expect(response.statusCode).toBe(405);
    });

});

describe('PUT /products/id', () => {
    it('should respond with a category object when provided with a valid ID', async () => {

        const category = await request(app).post('/categories').send(testCategory);
        const { id } = category.body;

        const body = {
            name: "Personal Care"
        };

        const response = await request(app).put(`/categories/${id}`).send(body);

        expect(response.body).instanceOf(Object);
    });

    it('should respond with a 204 status code when provided with an invalid ID', async () => {

        await request(app).post('/categories').send(testCategory);

        const body = {
            name: "Personal Care"
        };

        const response = await request(app).put(`/categories/${invalid_ID}`).send(body);

        expect(response.statusCode).toBe(204);
    });

});

describe('DELETE /products/id', () => {

    it('should respond with a 200 status when provided with a valid ID', async () => {

        const category = await request(app).post('/categories').send(testCategory);
        const { id } = category.body;

        const response = await request(app).delete(`/categories/${id}`).send();

        expect(response.statusCode).toBe(200);

    });

    it('should respond with a 204 status code when provided with an invalid ID', async () => {

        const response = await request(app).delete(`/categories/${invalid_ID}`).send();

        expect(response.statusCode).toBe(204);
    });
});