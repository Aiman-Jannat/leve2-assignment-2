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
exports.ordersControllers = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = require("./order.validation");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = req.body;
    try {
        const { error, value } = yield order_validation_1.orderValidation.validate(orderData);
        const result = yield order_service_1.orderServices.createOrderIntoDB(orderData);
        res.status(200).json({
            status: true,
            message: "Order created successfully!!",
            data: result,
        });
        return result;
    }
    catch (error) {
        res.status(400).json({
            status: false,
            message: "Oops!! Order is not created!",
            error: error,
        });
    }
});
const getAllOrderAndQueryOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    const searchTerm = email;
    if (searchTerm) {
        try {
            const result = yield order_service_1.orderServices.searchOrderByEmailFromDB(searchTerm);
            if (result.length === 0 || result === null) {
                res.status(200).json({
                    status: true,
                    message: `no user found!`,
                    data: result,
                });
                return result;
            }
            res.status(200).json({
                status: true,
                message: `Products matching search term ${searchTerm} fetched successfully!`,
                data: result,
            });
            return result;
        }
        catch (error) {
            res.status(400).json({
                status: false,
                message: `Oops!! no order found matched with ${searchTerm}!`,
                error: error,
            });
        }
    }
    else {
        try {
            const result = yield order_service_1.orderServices.getAllOrdersDataFromDB();
            res.status(200).json({
                status: true,
                message: "Product fetched successfully!!",
                data: result,
            });
            return result;
        }
        catch (error) {
            res.status(400).json({
                status: false,
                message: "Oops!! Order fetching failed!",
                error: error,
            });
        }
    }
});
exports.ordersControllers = {
    createOrder,
    getAllOrderAndQueryOrder
};
