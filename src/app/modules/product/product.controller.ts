import { Request, Response } from "express";
import ProductValidation from "./product.validation";
import { productServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  const productData = req.body;
  try {
    const { error, value } = await ProductValidation.validate(productData);
    if (error) {
      res.status(400).json({
        success: true,
        message: "Product is not created!",
        error: error.message,
      });
    } else {
      const result = await productServices.createProductIntoDB(productData);
      res.status(200).json({
        success: true,
        message: "Product created successfully!",
        data: productData,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Product is not created!",
      error: error.message,
    });
  }
};

const getAllProductAndQueryProduct = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;
  if (searchTerm) {
    try {
      const result = await productServices.searchProductsByNameFromDB(
        searchTerm
      );
      if (result.length === 0 || result === null) {
        res.status(200).json({
          success: true,
          message: "Product fetched successfully!",
          data: result,
        });
        return result;
      }
      res.status(200).json({
        success: false,
        message: `No matches found for product ${searchTerm}`,
      });

      return result;
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "`No matches found for product ${searchTerm}`",
      });
    }
  } else {
    try {
      const result = await productServices.getAllProductsDataFromDB();
      res.status(200).json({
        status: true,
        message: "Products fetched successfully!!",
        data: result,
      });
      return result;
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Products fetching failed!",
      });
    }
  }
};

const getSpecificProduct = async (req: Request, res: Response) => {
  try {
    const { productName } = req.params;
    const result = await productServices.getSpecificProductDataFromDB(
      productName
    );
    if (result === null) {
      res.status(200).json({
        success: false,
        message: "No product found with this name!",
      });
      return result;
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!!",
      data: result,
    });
    return result;
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Products fetching failed!",
      error: error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productName } = req.params; // Extract product name from request parameters
    const updateFields = req.body; // Extract update fields from request body
    const result = await productServices.updateProductIntoDB(
      productName,
      updateFields
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!!",
      data: result,
    });

    return result;
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Product update failed!",
      error: error,
    });
  }
};

const deleteSpecificProduct = async (req: Request, res: Response) => {
  try {
    const { productName } = req.params;
    const result = await productServices.deleteSpecificProductFromDB(
      productName
    );
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!!",
      data: null,
    });
    return result;
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Products deletion failed!",
      error: error,
    });
  }
};

const invalidRouteHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

export const productControllers = {
  createProduct,
  getAllProductAndQueryProduct,
  getSpecificProduct,
  updateProduct,
  deleteSpecificProduct,
  invalidRouteHandler,
};
