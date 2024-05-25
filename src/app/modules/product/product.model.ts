import mongoose, { Schema, Document, model } from 'mongoose';
import { TInventory, TProduct, TVariant } from './product.interface';

// Define TVariant schema
const VariantSchema = new Schema<TVariant>({
  type: { 
    type: String, 
},
  value: { 
    type: String,
}
});

// Define TInventory schema
const InventorySchema = new Schema<TInventory>({
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
const ProductSchema = new Schema<TProduct>({
  name: { type: String, required: true, unique:true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String]},
  variants: { 
    type: [VariantSchema], 
    required: true 
},
  inventory: { 
    type: InventorySchema, 
    required: true }
});

export const Product = model<TProduct>('product', ProductSchema)