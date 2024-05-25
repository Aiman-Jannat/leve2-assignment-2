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
exports.productServices = void 0;
const product_model_1 = require("./product.model");
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.create(productData);
    return product;
});
const getAllProductsDataFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find();
    return result;
});
const getSpecificProductDataFromDB = (productName) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(productName);
    const result = yield product_model_1.Product.findOne({ name: productName });
    return result;
});
const updateProductIntoDB = (productName, update) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { name: productName };
    const updatedProduct = yield product_model_1.Product.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true,
    });
    return updatedProduct;
});
const deleteSpecificProductFromDB = (productName) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteProduct = yield product_model_1.Product.deleteOne({ name: productName });
    return deleteProduct;
});
const searchProductsByNameFromDB = (searchName) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(searchName);
    try {
        const products = yield product_model_1.Product.find({
            name: { $regex: `${searchName}`, $options: 'i' },
        });
        return products;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.productServices = {
    createProductIntoDB,
    getAllProductsDataFromDB,
    getSpecificProductDataFromDB,
    updateProductIntoDB,
    deleteSpecificProductFromDB,
    searchProductsByNameFromDB,
};
