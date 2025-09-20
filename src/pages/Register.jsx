import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);

    try {
      await register(inputs); // call context register function
      navigate("/login"); // redirect to login after successful registration
    } catch (error) {
      setErr(error.response?.data || "Registration failed");
    }
  };

  return (
    <div className="sign-in">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          value={inputs.username}
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
        {err && <p style={{ color: "red" }}>{err}</p>}
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
