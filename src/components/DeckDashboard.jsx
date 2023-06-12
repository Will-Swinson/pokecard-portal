import React, { useContext } from "react";
import { CgPokemon } from "react-icons/cg";
import LoginContext from "../Context/LoginProvider";
import SearchPokemonCard from "./SearchPokemonCard";
export default function DeckDashboard() {
  const { handleDisplayDeck, pokeCards, pokeDeckIds, showDeck } =
    useContext(LoginContext);

  const favFilteredPokeCards = pokeDeckIds.map((pokeId) => {
    const filteredCards = pokeCards.find((card) => card.id === pokeId);
    const pokeCardInfo = {
      pokeId: filteredCards?.id,
      smallImg: filteredCards?.images.small,
      largeImg: filteredCards?.images.large,
    };
    return pokeCardInfo;
  });

  const favCards = favFilteredPokeCards.map((card) => {
    return <SearchPokemonCard key={card.id} pokeCardInfo={card} />;
  });

  return (
    <div className="bg-black h-screen w-screen mt-12 flex justify-start items-center flex-col">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-white font-mono text-5xl">Deck Dashboard</h1>
        <p className="text-blue-600 font-semibold">Access your decks here!</p>
      </div>
      <button className="flex flex-col justify-center items-center mt-10 mb-20 z-10">
        <div
          onClick={handleDisplayDeck}
          className="deck-div flex items-center text-black w-60 h-28 rounded"
        >
          <CgPokemon className="bg-blue-600 h-full w-20 rounded z-10" />
          <button className="ml-2 w-full flex justify-center items-center text-2xl font-mono font-bold z-10">
            Deck 1
          </button>
        </div>
      </button>
      {showDeck && (
        <div className=" bg-black w-screen grid gap-y-10 grid-cols-3 place-items-center ">
          {favCards}
        </div>
      )}
    </div>
  );
}
