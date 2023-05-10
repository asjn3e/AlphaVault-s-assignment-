const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 5000;
const mongoURI = "mongodb://localhost:27017/Dashboard"; // replace with your own MongoDB connection string

const { User } = require("./db/schema"); // importing your models from separate file

const { authorizeUser } = require("./middleware/middleware");

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
