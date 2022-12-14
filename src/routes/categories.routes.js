import { Router } from "express";
import { getCategories, getCategoryById, postCategory, modifyCategory, deleteCategory } from '../controllers/routes/categories.controllers.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: UUID
 *           description: The autogenerated id of the category
 *         name:
 *           type: string
 *           description: The name of the category
 *         createdAt:
 *           type: date
 *           description: Timestamp automatically created by Sequelize representing the category's moment of creation
 *         updatedAt:
 *           type: date
 *           description: Timestamp automatically created by Sequelize representing the category's latest update
 *       example:
 *         id: 55e26c8f-4f0e-42d2-b096-71f856f5a3ed
 *         name: Cars  
 *         updatedAt: 2022-08-28T21:43:51.000Z
 *         createdAt: 2022-08-28T21:43:51.000Z 
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: The categories managing API 
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Returns the list of all the categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: The list of the categories
 *         content:     
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category' 
 *       204:
 *          description: There are no categories loaded in the database 
 * 
*/


router.get('/', getCategories);


/**
 * @swagger
 * /categories/{id}:
 *  get:
 *    summary: Get the category by id and the products belonging to it
 *    tags: [Categories]
 *    parameters:
 *      - in: path
 *        name: id 
 *        schema:
 *          type: string
 *        required: true
 *        description: The category's id.
 *    responses:
 *      200:
 *        description: The category description by id and it's products
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      204:
 *        description: The category was not found.             
 */


router.get('/:id', getCategoryById);


/**
 * @swagger
 * /categories:
 *  post:
 *    summary: Create a new category
 *    tags: [Categories]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *    responses:
 *      201:
 *        description: The category was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      400:
 *        description: All fields must be filled to create the category
 *      405:
 *        description: Can not create the category with that name.    
 *      500:
 *        description: Something on the server went wrong. 
 */

router.post('/', postCategory);


/**
 * @swagger
 * /categories/{id}:
 *  put:
 *    summary: Modify a category
 *    tags: [Categories]
 *    parameters:
 *      - in: path
 *        name: id 
 *        schema:
 *          type: string
 *        required: true
 *        description: The category's id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *    responses:
 *      200:
 *        description: The category was succesfully updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *      204:
 *        description: The category was not found.    
 *      500:
 *        description: Something on the server went wrong. * 
 */


router.put('/:id', modifyCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id 
 *         schema:
 *           type: string
 *         required: true
 *         description: The category's id
 *     responses:
 *       200:
 *         description: The category was successfully deleted.
 *       204:
 *         description: The category was not found.
 *       500:
 *         description: Something on the server went wrong. *             
 */


router.delete('/:id', deleteCategory);

export default router;