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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productControllers = void 0;
const product_validation_1 = __importDefault(require("./product.validation"));
const product_service_1 = require("./product.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = req.body;
    try {
        const { error, value } = yield product_validation_1.default.validate(productData);
        const result = yield product_service_1.productServices.createProductIntoDB(productData);
        res.status(200).json({
            status: true,
            message: "Product created successfully!!",
            data: productData,
        });
    }
    catch (error) {
        res.status(400).json({
            status: false,
            message: "Oops!! Product is not created!",
            error: error.message,
        });
    }
});
const getAllProductAndQueryProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    if (searchTerm) {
        try {
            const result = yield product_service_1.productServices.searchProductsByNameFromDB(searchTerm);
            if (result.length === 0 || result === null) {
                res.status(200).json({
                    status: true,
                    message: `No products matching found for ${searchTerm}!`,
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
                message: `Oops!! no product found matched with ${searchTerm}!`,
                error: error,
            });
        }
    }
    else {
        try {
            const result = yield product_service_1.productServices.getAllProductsDataFromDB();
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
                message: "Oops!! Products fetching failed!",
                error: error,
            });
        }
    }
});
const getSpecificProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName } = req.params;
        const result = yield product_service_1.productServices.getSpecificProductDataFromDB(productName);
        if (result === null) {
            res.status(200).json({
                status: true,
                message: "No product found with this name!!",
                data: result,
            });
            return result;
        }
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
            message: "Oops!! Products fetching failed!",
            error: error,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName } = req.params; // Extract product name from request parameters
        const updateFields = req.body; // Extract update fields from request body
        const result = yield product_service_1.productServices.updateProductIntoDB(productName, updateFields);
        res.status(200).json({
            status: true,
            message: "Product updated successfully!!",
            data: result,
        });
        return result;
    }
    catch (error) {
        res.status(400).json({
            status: false,
            message: "Oops!! Products update failed!",
            error: error,
        });
    }
});
const deleteSpecificProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName } = req.params;
        const result = yield product_service_1.productServices.deleteSpecificProductFromDB(productName);
        res.status(200).json({
            status: true,
            message: "Product deleted successfully!!",
            data: null,
        });
        return result;
    }
    catch (error) {
        res.status(400).json({
            status: false,
            message: "Oops!! Products deletion failed!",
            error: error,
        });
    }
});
exports.productControllers = {
    createProduct,
    getAllProductAndQueryProduct,
    getSpecificProduct,
    updateProduct,
    deleteSpecificProduct,
};
