import { Router } from "express";

import productRoutes from './products.routes.js';
import categoriesRoutes from './categories.routes.js';

const router = Router();


router.use('/products', productRoutes);
router.use('/categories', categoriesRoutes);


export default router;