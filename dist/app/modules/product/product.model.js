"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
// Define TVariant schema
const VariantSchema = new mongoose_1.Schema({
    type: {
        type: String,
    },
    value: {
        type: String,
    }
});
// Define TInventory schema
const InventorySchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        required: true
    }
});
// Define TProduct schema
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String] },
    variants: {
        type: [VariantSchema],
        required: true
    },
    inventory: {
        type: InventorySchema,
        required: true
    }
});
exports.Product = (0, mongoose_1.model)('product', ProductSchema);
