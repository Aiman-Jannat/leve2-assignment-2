"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const order_model_1 = require("./order.model");
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.create(orderData);
    return order;
});
const getSpecificOrderDataFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findOne({ productId: productId });
    return result === null || result === void 0 ? void 0 : result.quantity;
});
const getAllOrdersDataFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find();
    return result;
});
const searchOrderByEmailFromDB = (searchEmail) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(searchEmail);
    try {
        const products = yield order_model_1.Order.find({
            email: { $eq: `${searchEmail}` },
        });
        return products;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.orderServices = {
    createOrderIntoDB,
    getAllOrdersDataFromDB,
    searchOrderByEmailFromDB,
    getSpecificOrderDataFromDB
};
