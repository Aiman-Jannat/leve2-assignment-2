import mongoose, { Schema } from'mongoose';
import TOrder from './order.interface';
import { Product } from '../product/product.model';

const orderSchema = new Schema<TOrder>({
    email: {
        type: String,
        required: [true, "Email is required"]
      },
      productId: {
        type: String,
        required: [true, "Product ID is required"]
      },
      price: {
        type: Number,
        required: [true, "Price is required"]
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required"]
      }
});

orderSchema.pre<TOrder | undefined>('save',async function(next){
    const order:any = this;
   try{
    const existingProduct:any = await Product.findOne({productId:order.productId});
    // const diff =  existingProduct?.inventory.quantity-user.quantity;
    if (!existingProduct) {
        throw new Error('Product not found');
    }
    const diff = existingProduct.inventory.quantity - order.quantity;

        if (diff < 0) {
            throw new Error('Insufficient quantity available in inventory');
        }
        existingProduct.inventory.quantity -= order.quantity;
        if (existingProduct.inventory.quantity === 0) {
            existingProduct.inventory.inStock = false;
        }
        await existingProduct.save();


    next()
   }
    catch(error:any){
        next(error.message);
    }
  })

export  const Order = mongoose.model('order', orderSchema);