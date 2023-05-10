import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddProduct = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    numberInStock: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      axios.post("http://localhost:5000/products", formData);
      history.push("/dashboard");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Product</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <label htmlFor="numberInStock">Number In Stock:</label>
        <input
          type="number"
          id="numberInStock"
          name="numberInStock"
          value={formData.numberInStock}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
