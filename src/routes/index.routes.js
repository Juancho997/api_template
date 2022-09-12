import { Router } from "express";

import productsRoutes from './products.routes.js';
import categoriesRoutes from './categories.routes.js';

const router = Router();


router.use('/products', productsRoutes);
router.use('/categories', categoriesRoutes);


export default router;