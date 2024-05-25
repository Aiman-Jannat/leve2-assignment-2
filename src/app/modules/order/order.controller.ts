import { Request, Response } from "express";
import { orderServices } from "./order.service";
import { orderValidation } from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
    const orderData  = req.body;
    try{
    const { error, value } = await orderValidation.validate(orderData);
    const result = await orderServices.createOrderIntoDB(orderData);
    
      res.status(200).json({
        status: true,
        message: "Order created successfully!!",
        data: result,
      });
      return result;
      
    
  }catch(error:any){
      res.status(400).json({
          status: false,
          message: "Oops!! Order is not created!",
          error: error,
        });
  }
  };

  const getAllOrderAndQueryOrder = async (req: Request, res: Response) => {
    const { email } = req.query;
    const searchTerm = email;
    if (searchTerm) {
      try {
        const result = await orderServices.searchOrderByEmailFromDB(
          searchTerm
        );
        if (result.length === 0||result===null) {
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
      } catch (error) {
        res.status(400).json({
          status: false,
          message: `Oops!! no order found matched with ${searchTerm}!`,
          error: error,
        });
      }
    } else {
      try {
        const result = await orderServices.getAllOrdersDataFromDB();
        res.status(200).json({
          status: true,
          message: "Product fetched successfully!!",
          data: result,
        });
        return result;
      } catch (error) {
        res.status(400).json({
          status: false,
          message: "Oops!! Order fetching failed!",
          error: error,
        });
      }
    }
  };

  export const ordersControllers = {
    createOrder,
    getAllOrderAndQueryOrder
  }