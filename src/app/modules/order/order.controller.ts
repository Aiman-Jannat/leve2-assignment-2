import { Request, Response } from "express";
import { orderServices } from "./order.service";
import { orderValidation } from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
    const orderData  = req.body;
    try{
    const { error, value } = await orderValidation.validate(orderData);
    console.log(error?.message)
    if(error)
      {
        res.status(400).json({
          success: false,
          message: "No order is created!!",
          data: error.message,
        });

      }
      else{
    const result = await orderServices.createOrderIntoDB(orderData);
    
      res.status(200).json({
        success: true,
        message: "Order created successfully!!",
        error: result,
      });
      return result;
      
      }
  }catch(error:any){
      res.status(400).json({
          success: false,
          message:"Order is not created!",
          error: error
        });
  }
  };

  const getAllOrderAndQueryOrder = async (req: Request, res: Response) => {
    const {email}   = req.query;
    const searchTerm = email;
    console.log(searchTerm)
    if (searchTerm) {
      try {
        const result = await orderServices.searchOrderByEmailFromDB(
          searchTerm
        );
        if (result.length === 0||result===null) {
          res.status(200).json({
            success: false,
            message: `No user found!`,
            
          });
          return result;
        }
        res.status(200).json({
          success: true,
          message: `Products matching search term ${searchTerm} fetched successfully!`,
          data: result,
        });
  
        return result;
      } catch (error) {
        res.status(400).json({
          success: false,
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
  const invalidRouteHandler = (req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: "Route not found"
    });
  };
  export const ordersControllers = {
    createOrder,
    getAllOrderAndQueryOrder,
    invalidRouteHandler
  }