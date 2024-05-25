import  express from "express";
import { productControllers } from "./product.controller";

const router = express.Router();

router.post('/products',productControllers.createProduct)
router.get('/products',productControllers.getAllProductAndQueryProduct)
router.get('/products/:productName',productControllers.getSpecificProduct)
router.put('/products/:productName',productControllers.updateProduct)
router.delete('/products/:productName',productControllers.deleteSpecificProduct)



export const ProductRoutes = router;