const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Product name is required."
  }),
  description: Joi.string().allow(""),
  price: Joi.number().required().messages({
    "number.base": "Price must be a number",
    "any.required": "Price is required"
  }),
  category: Joi.string().required(),
  stock: Joi.number().min(0)
}); 


const updateProductSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string().allow(""),
  price: Joi.number(),
  category: Joi.string(),              // NOT REQUIRED
  stock: Joi.number().min(0),
  image: Joi.string().allow(null, "")
}); 

const validateProduct = (data) => productSchema.validate(data);
const updateProduct = (data) => updateProductSchema.validate(data);

module.exports = {
  validateProduct,
  updateProduct
};