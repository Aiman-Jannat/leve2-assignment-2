const Joi = require("joi");

// Define Joi schema for TVariant
const VariantValidation = Joi.object({
  type: Joi.string().required(),
  value: Joi.string().required(),
});

// Define Joi schema for TInventory
const InventoryValidation = Joi.object({
  quantity: Joi.number().required(),
  inStock: Joi.boolean().required(),
});

// Define Joi schema for TProduct
const ProductValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  variants: Joi.array().items(VariantValidation).required(),
  inventory: InventoryValidation.required(),
});

export default ProductValidation;
