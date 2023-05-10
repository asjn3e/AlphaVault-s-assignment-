const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 5000;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoURI = "mongodb://localhost:27017/Dashboard"; // replace with your own MongoDB connection string

const { User, Product } = require("./db/schema"); // importing your models from separate file

const { authorizeUser } = require("./middleware/middleware");

app.use(cors());
app.use(express.json());

const jwtSecret = "mysecretkey";

// connect to MongoDB database
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, name } = req.body;
    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // hash the password and create a new user object
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      isAdmin: false,
    });
    // save the new user object to the databasejwtSecret
    const savedUser = await newUser.save();
    // generate a JWT token with the user ID and return it in the response
    const token = jwt.sign({ user: savedUser }, jwtSecret);
    res.json({ user: savedUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// define the login API endpoint
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // generate JWT token
    const token = jwt.sign({ user }, jwtSecret);
    // return user details and JWT token
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// define the delete user API endpoint with the middleware to authorize user
app.delete("/users/:id", authorizeUser, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// define the update user API endpoint with the middleware to authorize user
app.put("/users/:id", authorizeUser, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// define the get all products API endpoint with auth middleware
app.get("/users", authorizeUser, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// define the get all products API endpoint with auth middleware
app.get("/products", authorizeUser, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// define the delete product API endpoint with auth middleware
app.delete("/products/:id", authorizeUser, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    console.log(req.body);
    const { name, price, numberInStock } = req.body;
    const newProduct = new Product({
      name,
      price,
      numberInStock,
    });
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
