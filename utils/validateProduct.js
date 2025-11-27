const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().required().message({
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

const validateProduct = (data) => productSchema.validate(data);

module.exports = validateProduct;