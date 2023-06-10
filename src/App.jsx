import { useState, useEffect, useContext } from "react";
import Header from "./components/Header";
import Lucario from "./components/Lucario";
import Hero from "./components/Hero";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import SearchBoard from "./components/SearchBoard";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import "./App.css";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const currentUser =
      localStorage.getItem("token") !== "undefined"
        ? JSON.parse(localStorage.getItem("token"))
        : localStorage.clear();

    if (
      !currentUser &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/signup"
    ) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/home" element={<Hero />} />
        <Route path="/search" element={<SearchBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
