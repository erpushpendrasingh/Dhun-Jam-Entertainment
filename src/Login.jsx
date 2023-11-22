import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
     const navigate = useNavigate();
     const [formData, setFormData] = useState({
          username: "",
          password: "",
     });
     const [showPassword, setShowPassword] = useState(false);
     const handleInputChange = (event) => {
          const { name, value } = event.target;
          setFormData({ ...formData, [name]: value });
     };
     const handleTogglePassword = () => {
          setShowPassword(!showPassword);
          showPassword ? <FaEyeSlash /> : <FaEye />;
     };

     const handleSubmit = async (event) => {
          event.preventDefault();
          const username = formData.username;
          const password = formData.password;

          try {
               const response = await axios.post(
                    "https://stg.dhunjam.in/account/admin/login",
                    {
                         username,
                         password,
                    }
               );

               if (response.status === 200) {
                    localStorage.setItem(
                         "user",
                         JSON.stringify(response?.data?.data)
                    );
                    navigate("/dashboard");
               } else {
                    console.log("Login failed:", response.data);
               }
          } catch (error) {
               console.log("Error:", error);
          }
     };
     return (
          <div>
               <h1 className="header">Venue Admin Login</h1>
               <form onSubmit={handleSubmit}>
                    <div className="form-group">
                         <input
                              className="inp"
                              type="text"
                              name="username"
                              value={formData.username}
                              onChange={handleInputChange}
                              placeholder="Username"
                              required
                         />
                    </div>
                    <div className="password-input">
                         <input
                              className="inp"
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              placeholder="Password"
                              required
                         />
                         <span
                              className="toggle-password"
                              onClick={handleTogglePassword}
                         >
                              {showPassword ? <FaEye /> : <FaEyeSlash />}
                         </span>
                    </div>
                    <button type="submit" class="btn">
                         Sign in
                    </button>
                    <h5>New Registration ?</h5>
               </form>
          </div>
     );
};

export default Login;
