import React from "react";
import SearchPokemonCard from "./SearchPokemonCard";
import dotenv from "dotenv";
import axios from "axios";
import { useState, useEffect } from "react";
const POKE_KEY = "48f471fc-a984-4e21-b4ad-a943c576fd2c";

export default function SearchBoard() {
  const [pokeCards, setPokeCards] = useState([]);
  const [pokeSearch, setPokeSearch] = useState("");

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

  function handleSearch(event) {
    setPokeSearch(event.target.value);
  }

  const filteredCards = pokeCards.filter((card) => {
    return card.name.toLowerCase().includes(pokeSearch.toLowerCase());
  });

  const PokemonCards = filteredCards.map((card) => {
    console.log(card);
    const pokeCardInfo = {
      smallImg: card.images.small,
      largeImg: card.images.large,
      name: card.name,
    };
    return <SearchPokemonCard key={card.id} pokeCardInfo={pokeCardInfo} />;
  });

  return (
    <>
      <div className="bg-black h-screen w-screen">
        <form
          onSubmit={handleSearch}
          className=" h-16 flex justify-center items-center mb-14"
        >
          <input
            type="text"
            placeholder="Search Pokemon"
            className="bg-black text-white border-2 border-white rounded-lg p-2 w-1/2 text-center"
            value={pokeSearch}
            onChange={handleSearch}
          ></input>
        </form>
        <div className=" bg-black grid gap-y-10 grid-cols-3 place-items-center ">
          {PokemonCards}
        </div>
      </div>
    </>
  );
}
