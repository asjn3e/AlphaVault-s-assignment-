const mongoose = require("mongoose");

// define the schema for the users collection
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  profilePicture: String,
  name: String,
});

// define the schema for the products collection
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
  },
});

// create the models for the users and products collections
const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);

module.exports.User = User;
module.exports.Product = User;
