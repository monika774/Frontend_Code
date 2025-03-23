import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signupAdmin } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const [userData] = useState({ email: "", username: "", password: "" });
  const [setError] = useState("");
  const [ setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await signupAdmin(userData);
      login(response.data.user, response.data.access);
      navigate("/books");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Signup</h2>

      <form onSubmit={handleSubmit}>
        {/* Input Fields */}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
