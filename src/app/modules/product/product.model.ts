import mongoose, { Schema, Document, model } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";

// Define TVariant schema
const VariantSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: [true, "Variant type is required"],
  },
  value: {
    type: String,
    required: [true, "Variant value is required"],
  },
});

// Define TInventory schema
const InventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: [true, "Inventory quantity is required"],
  },
  inStock: {
    type: Boolean,
    required: [true, "Inventory inStock status is required"],
  },
});

// Define TProduct schema
const ProductSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, "Product name is required"],
    unique: [true, "Product name must be unique"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
  },
  tags: {
    type: [String],
  },
  variants: {
    type: [VariantSchema],
    required: [true, "Product variants are required"],
  },
  inventory: {
    type: InventorySchema,
    required: [true, "Product inventory is required"],
  },
});

export const Product = model<TProduct>("product", ProductSchema);
