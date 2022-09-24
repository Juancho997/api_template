import { it, expect, describe, afterEach, beforeAll, afterAll } from 'vitest';
import request from 'supertest';

import { app } from '../index.js';
import {databaseInstance} from '../src/database/index.js';
import { testProduct, testCategory, invalid_ID } from './resources.js';


let testCategoryObj;

beforeAll(async () => {
    // await databaseConfiguration.databaseInstance.query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true }); //allow us to work without foreing key constrains
    testCategoryObj = await request(app).post('/categories').send(testCategory);
    testProduct.categoryId = testCategoryObj.body.id;
});

afterEach(async () => {
    await databaseInstance.models.product.truncate(/*{ cascade: true }*/);
});

afterAll(async () => {
    await databaseConfiguration.databaseInstance.models.category.truncate(/*{ cascade: true }*/);
});

describe('GET /products', () => {

    it('should respond with a 200 status code if there are any products loaded', async () => {

        await request(app).post('/products').send(testProduct);
        const response = await request(app).get('/products').send();
        expect(response.statusCode).toBe(200);
    });

    it('should respond with an array of products', async () => {

        await request(app).post('/products').send(testProduct);
        const response = await request(app).get('/products').send();
        expect(response.body).toBeInstanceOf(Array);
    });

});

describe('GET /products/id', () => {

    it('should respond with a 200 status code if there are any products loaded', async () => {

        const product = await request(app).post('/products').send(testProduct);

        const { id } = product.body;

        const response = await request(app).get(`/products/${id}`).send();

        expect(response.statusCode).toBe(200);
    });

    it('should respond with a product object', async () => {
        const product = await request(app).post('/products').send(testProduct);

        const { id } = product.body;

        const response = await request(app).get(`/products/${id}`).send();

        expect(response.body).toBeInstanceOf(Object);
    });

    it('should respond with a 204 status code if an invalid ID is provided', async () => {
        await request(app).post('/products').send(testProduct);

        const response = await request(app).get(`/products/${invalid_ID}`).send();

        expect(response.statusCode).toBe(204);
    });

});

describe('POST /products', () => {

    it('should respond with an object when provided with a name, image, description, price and categoryId', async () => {

        const response = await request(app).post('/products').send(testProduct);

        expect(response).toBeInstanceOf(Object);
    });

    it('should respond with a 405 status code if the product name its already taken', async () => {
        await request(app).post('/products').send(testProduct);

        const response = await request(app).post('/products').send(testProduct);

        expect(response.statusCode).toBe(405);
    });

});

describe('PUT /products/id', () => {
    it('should respond with a product object when provided with a valid ID', async () => {

        const product = await request(app).post('/products').send(testProduct);
        const { id } = product.body;

        const body = {
            name: "Clio"
        };

        const response = await request(app).put(`/products/${id}`).send(body);

        expect(response).instanceOf(Object);
    });

    it('should respond with a 204 status code when provided with an valid ID', async () => {

        await request(app).post('/products').send(testProduct);

        const body = {
            name: "Clio"
        };

        const response = await request(app).put(`/products/${invalid_ID}`).send(body);

        expect(response.statusCode).toBe(204);
    });

});

describe('DELETE /products/id', () => {

    it('should respond with a 200 status when provided with a valid ID', async () => {

        const product = await request(app).post('/products').send(testProduct);
        const { id } = product.body;

        const response = await request(app).delete(`/products/${id}`).send();

        expect(response.statusCode).toBe(200);

    });

    it('should respond with a 204 status code when provided with an valid ID', async () => {

        await request(app).post('/products').send(testProduct);

        const response = await request(app).put(`/products/${invalid_ID}`).send();

        expect(response.statusCode).toBe(204);
    });
});