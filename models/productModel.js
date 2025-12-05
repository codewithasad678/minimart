const moongoose = require("mongoose");

const productSchema = new moongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    image : { type: String, default: null  },
    createdAT : {type : Date, default: Date.now }
});


const Product = moongoose.model("Product",productSchema);
module.exports = Product;