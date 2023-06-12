import React from "react";
import SearchPokemonCard from "./SearchPokemonCard";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import LoginContext from "../Context/LoginProvider";

export default function SearchBoard() {
  const { pokeCards, pokeSearch, setPokeSearch } = useContext(LoginContext);

  function handleSearch(event) {
    setPokeSearch(event.target.value);
  }

  const filteredCards = pokeCards.filter((card) => {
    return card.name.toLowerCase().includes(pokeSearch.toLowerCase());
  });

  const PokemonCards = filteredCards.map((card) => {
    const pokeCardInfo = {
      pokeId: card.id,
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
