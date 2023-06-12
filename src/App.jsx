import { useState, useEffect, useContext } from "react";
import Header from "./components/Header";
import Lucario from "./components/Lucario";
import Hero from "./components/Hero";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import SearchBoard from "./components/SearchBoard";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import LoginContext from "./Context/LoginProvider";
import axios from "axios";

import "./App.css";
import DeckDashboard from "./components/DeckDashboard";

const POKE_KEY = "48f471fc-a984-4e21-b4ad-a943c576fd2c";
function App() {
  const { setPokeCards } = useContext(LoginContext);

  const navigate = useNavigate();

  // Fetch Pokemon Cards
  useEffect(() => {
    async function getPokemonCards() {
      try {
        const response = await axios.get(
          "https://api.pokemontcg.io/v2/cards?query=images&pageSize=250",
          {
            headers: {
              "X-Api-Key": POKE_KEY,
            },
          }
        );
        setPokeCards(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    getPokemonCards();
  }, []);

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
        <Route path="/decks" element={<DeckDashboard />} />
        <Route path="/search" element={<SearchBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
