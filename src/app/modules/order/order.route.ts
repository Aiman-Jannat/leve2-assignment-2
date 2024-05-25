import  express from "express";
import { ordersControllers } from "./order.controller";
const router = express.Router();

router.get('/orders',ordersControllers.getAllOrderAndQueryOrder)
router.post('/orders',ordersControllers.createOrder)

export const OrderRoutes = router;