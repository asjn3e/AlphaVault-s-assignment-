import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../features/userSlice";
import { useHistory } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate form data
    let errors = {};
    if (!email) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // send form data to backend
      try {
        const response = await axios.post(
          "http://localhost:5000/login",
          formData
        );

        dispatch(setToken(response.data.token));
        dispatch(setUser(response.data.user));
        history.push("/dashboard");
      } catch (error) {
        setFormErrors({
          ...formErrors,
          password: error.response.data.message,
        }); // handle error response
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          {formErrors.email && <div className="error">{formErrors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
          {formErrors.password && (
            <div className="error">{formErrors.password}</div>
          )}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
