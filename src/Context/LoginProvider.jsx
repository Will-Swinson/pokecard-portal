import React, { useContext, createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { set } from "react-hook-form";
// import jsw from "jsonwebtoken";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [doesExists, setDoesExists] = useState("");
  const [pokeCards, setPokeCards] = useState([]);
  const [pokeSearch, setPokeSearch] = useState("");
  const [pokeDeckIds, setPokeDeckIds] = useState([]);
  const [showDeck, setShowDeck] = useState(false);
  const [isNoFavorite, setIsNoFavorite] = useState("");
  const navigate = useNavigate();

  // Handle Signup

  const handleSignup = async (formData) => {
    try {
      const response = await axios.post("/api/signup", formData);
      await setLogin((prevLogin) => !prevLogin);

      // Get ID from DB
      const tokenID = response.data.token;
      localStorage.setItem("token", JSON.stringify(tokenID));
      navigate("/search");
    } catch (err) {
      await setDoesExists(err.response.data.err);
    }
  };

  // Handle Login
  const handleLogin = async (formData) => {
    try {
      const response = await axios.post("/api/login", formData);
      await setLogin((prevLogin) => !prevLogin);

      // Get ID from DB
      const tokenID = response.data.token;
      localStorage.setItem("token", JSON.stringify(tokenID));
      navigate("/search");
    } catch (err) {
      await setDoesExists(err.response.data.err);
    }
  };

  // Handle Logout
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
  console.log(showDeck);

  // handleDisplayDeck
  const handleDisplayDeck = async () => {
    try {
      if (!showDeck) {
        console.log("show deck");
        const tokenID = JSON.parse(localStorage.getItem("token"));

        const response = await axios.get(`/api/favorite`, {
          headers: { Authorization: `Bearer ${tokenID}` },
        });
        const pokeIds = response.data.favorites.map((poke) => poke.card_id);
        await setPokeDeckIds(pokeIds);
        await setShowDeck((prevShowDeck) => !prevShowDeck);
        await setIsNoFavorite("");
        return;
      }
      setShowDeck((prevShowDeck) => !prevShowDeck);
    } catch (err) {
      console.log(err.response.data.err);
      await setIsNoFavorite(err.response.data.err);
    }
  };

  // Remove Favorite
  const handleRemoveFavorite = async (pokeId) => {
    try {
      const tokenID = JSON.parse(localStorage.getItem("token"));
      const response = await axios.delete(`/api/favorite/${pokeId}`, {
        headers: { Authorization: `Bearer ${tokenID}` },
      });
      const pokeIds = response.data.favorites.map((poke) => poke.card_id);
      await setPokeDeckIds(pokeIds);
      return window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        handleSignup,
        handleLogin,
        pokeDeckIds,
        setPokeDeckIds,
        login,
        handleDisplayDeck,
        handleLogout,
        doesExists,
        pokeCards,
        setPokeCards,
        pokeSearch,
        setPokeSearch,
        showDeck,
        setShowDeck,
        handleRemoveFavorite,
        isNoFavorite,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
