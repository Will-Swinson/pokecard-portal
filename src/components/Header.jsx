import React, { useContext } from "react";
import { FaHome } from "react-icons/fa";
import { CgPokemon } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { GiCardDraw } from "react-icons/gi";
import { Link } from "react-router-dom";
import LoginContext from "../Context/LoginProvider";
import PokeballIcon from "./PokeballIcon";

export default function Header() {
  const { login } = useContext(LoginContext);
  return (
    <header className="bg-black w-screen h-28 text-blue-600 flex justify-between items-end font-mono">
      <h1 className=" ml-10 mb-6 font-bold  text-4xl">PokeCard Portal</h1>
      <div className="flex justify-end items-end list-none mr-2">
        <li className="mr-12 mb-4 flex justify-center items-center cursor-pointer transition-transform hover:scale-110">
          <FaHome className="mr-2" />
          <Link to="/home">Home</Link>
        </li>
        <li className="mr-12 mb-4 flex justify-center items-center cursor-pointer transition-transform hover:scale-110">
          <GiCardDraw className="mr-2" />
          <Link to="/decks">Decks</Link>
        </li>
        <li className="mr-12 mb-4 flex justify-center items-center cursor-pointer transition-transform hover:scale-110">
          <CgPokemon className="mr-2" />
          Community
        </li>
        <li className="mr-12 mb-4 flex justify-center items-center cursor-pointer transition-transform hover:scale-110">
          <FaSearch className="mr-2 " />
          <Link to="/search">Search Cards</Link>
        </li>
        <li
          className={
            "mr-10 mb-4 flex justify-center items-center cursor-pointer transition-transform hover:scale-110 "
          }
        >
          {login ? null : <IoLogIn className="mr-2" />}
          <Link to="/signup">
            {login ? <PokeballIcon /> : "Login / Sign Up"}
          </Link>
          {login && <div className="ml-2">Logout</div>}
        </li>
      </div>
    </header>
  );
}
