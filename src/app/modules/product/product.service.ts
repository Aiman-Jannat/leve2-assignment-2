import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (productData: TProduct) => {
  try {
    const product = await Product.create(productData);
    return product;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getAllProductsDataFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSpecificProductDataFromDB = async (productName: string) => {
  console.log(productName);
  const result = await Product.findOne({ name: productName });
  return result;
};

const updateProductIntoDB = async (productName: string, update: object) => {
  const filter = { name: productName };
  const updatedProduct = await Product.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
  });

  return updatedProduct;
};
const deleteSpecificProductFromDB = async (productName: string) => {
  const deleteProduct = await Product.deleteOne({ name: productName });
  return deleteProduct;
};

const searchProductsByNameFromDB = async (searchName: any) => {
  console.log(searchName);
  try {
    const products = await Product.find({
      name: { $regex: `${searchName}`, $options: "i" },
    });
    return products;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const productServices = {
  createProductIntoDB,
  getAllProductsDataFromDB,
  getSpecificProductDataFromDB,
  updateProductIntoDB,
  deleteSpecificProductFromDB,
  searchProductsByNameFromDB,
};
