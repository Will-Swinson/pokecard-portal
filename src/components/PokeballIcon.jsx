import React, { useContext } from "react";
import LoginContext from "../Context/LoginProvider";

export default function PokeballIcon() {
  const { handleLogout } = useContext(LoginContext);
  return (
    <div className="pokeball group absolute" onClick={handleLogout}>
      <div className="pokeball__button"></div>
    </div>

    // <div class="w-10 h-10 bg-white border-4 border-black rounded-full overflow-hidden shadow-inner relative animate-fall animate-bounce hover:animate-none">
    //   <div class="absolute w-full h-1/2 bg-red-600"></div>
    //   <div class="absolute top-1/2 mt-2.5 w-full h-5 bg-black"></div>
    //   <div class="absolute top-1/2 mt-7.5 left-1/2 ml-7.5 w-15 h-15 bg-gray-600 border-4 border-white rounded-full shadow-button relative z-10 animate-blink hover:animate-none"></div>
    // </div>
  );
}
