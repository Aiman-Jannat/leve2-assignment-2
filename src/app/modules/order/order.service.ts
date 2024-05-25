import TOrder from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (orderData: TOrder) => {
    const order = await Order.create(orderData);
    return order;
  };

  
const getSpecificOrderDataFromDB = async (productId: string) => {
  const result = await Order.findOne({ productId: productId });
  return result?.quantity;
};

  const getAllOrdersDataFromDB = async () => {
    const result = await Order.find();
    return result;
  };

  const searchOrderByEmailFromDB = async (searchEmail: any) => {
    console.log(searchEmail)
    try{
    const products = await Order.find({
    email: { $eq: `${searchEmail}`},
  });
  return products;
}
catch(error){
    console.log(error)
    throw error
}
};

  export const orderServices = {
    createOrderIntoDB,
    getAllOrdersDataFromDB,
    searchOrderByEmailFromDB,
    getSpecificOrderDataFromDB
  }