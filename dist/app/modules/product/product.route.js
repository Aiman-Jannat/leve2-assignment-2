"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post('/products', product_controller_1.productControllers.createProduct);
router.get('/products', product_controller_1.productControllers.getAllProductAndQueryProduct);
router.get('/products/:productName', product_controller_1.productControllers.getSpecificProduct);
router.put('/products/:productName', product_controller_1.productControllers.updateProduct);
router.delete('/products/:productName', product_controller_1.productControllers.deleteSpecificProduct);
exports.ProductRoutes = router;
