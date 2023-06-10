import React, { useContext, createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [doesExists, setDoesExists] = useState("");
  const navigate = useNavigate();

  // Handle Signup

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post("/api/signUp", formData);
      await setLogin((prevLogin) => !prevLogin);

      // Get ID from DB
      const tokenID = response.data.id;
      localStorage.setItem("token", JSON.stringify(tokenID));
      navigate("/search");
    } catch (err) {
      await setDoesExists(err.response.data.err);
    }
  };
  console.log(login);

  const handleLogout = async () => {
    try {
      await setLogin((prevLogin) => !prevLogin);
      localStorage.clear();
      setDoesExists("");
      navigate("/home", { replace: true });
    } catch (err) {
      console.log(err.response.data.err);
    }
  };

  console.log(doesExists);
  return (
    <LoginContext.Provider
      value={{ handleLogin, login, handleLogout, doesExists }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
