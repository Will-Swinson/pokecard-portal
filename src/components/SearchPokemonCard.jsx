import { CgPokemon } from "react-icons/cg";
import React, { useEffect, useRef, useContext } from "react";
import LoginContext from "../Context/LoginProvider";
import { set } from "react-hook-form";
import axios from "axios";

const CardComponent = ({ pokeCardInfo }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    const handleMouseMove = (event) => {
      const cardWidth = card.offsetWidth;
      const cardHeight = card.offsetHeight;
      const cardRect = card.getBoundingClientRect();
      const mouseX = event.clientX - cardRect.left - cardWidth / 2;
      const mouseY = event.clientY - cardRect.top - cardHeight / 2;
      const tiltMax = 20; // Maximum tilt angle in degrees

      const tiltX = (tiltMax / (cardHeight / 2)) * mouseY;
      const tiltY = (tiltMax / (cardWidth / 2)) * mouseX * -1;

      card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  async function handleCardLike(event) {
    event.stopPropagation();
    event.target.classList.toggle("text-red-600");
    const token = JSON.parse(localStorage.getItem("token"));
    const addCardData = {
      cardId: pokeCardInfo.pokeId,
    };

    await axios.post("/api/favorite", addCardData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("clicked");
  }

  return (
    <div className="bg-black ">
      <div ref={cardRef} className="card ">
        <CgPokemon
          onClick={handleCardLike}
          className={
            "absolute z-50 p-0 m-0 -bottom-1 -left-1 w-14 h-14 cursor-pointer rounded-xl hover:bg-white"
          }
        />
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${pokeCardInfo.smallImg})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default CardComponent;
