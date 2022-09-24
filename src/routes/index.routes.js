import { Router } from "express";

// import usersRoutes from './users.routes.js';
import productsRoutes from './products.routes.js';
import categoriesRoutes from './categories.routes.js';

const router = Router();

router.use('/products', productsRoutes);
router.use('/categories', categoriesRoutes);
// router.use('/users', usersRoutes);


export default router;