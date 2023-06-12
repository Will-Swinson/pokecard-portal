import React, { useEffect, useState } from "react";
import Lucario from "./Lucario";
import { Link } from "react-router-dom";
import AnimatedText from "./AnimatedText";
// import classNames from "classnames";

export default function Hero() {
  return (
    <>
      <div className="absolute flex flex-col w-80 text-white z-10 right-1/4 top-1/4 items-center">
        <h1 className="flex flex-col justify-center items-center font-bold text-4xl">
          PokeCard Portal is <AnimatedText />
        </h1>

        <p className="text-2xl mt-2">
          {" "}
          A community to share your favorite Pokemon and join a community of
          people who are ready to talk and share with.{" "}
        </p>
        <button className="mt-14 bg-blue-600 w-1/2 h-12 rounded hover:bg-white hover:text-blue-400 transition-colors duration-200">
          <Link to="/signup">Get Started!</Link>
        </button>
      </div>

      <Lucario />
    </>
  );
}
