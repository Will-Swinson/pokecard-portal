import React, { useEffect } from "react";

const CardComponent = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".card");

    const resetTransform = (el, perspective = 800) => {
      el.style.transform = `translate3d(0%, 0%, -${
        perspective / 2
      }px) rotateX(0deg) rotateY(0deg)`;
    };

    const onMove = (ev, el) => {
      const { pageX, pageY } = ev;
      const { offsetWidth, offsetHeight } = el;
      const { left, top } = el.getBoundingClientRect();

      const cardX = left + offsetWidth / 2;
      const cardY = top + offsetHeight / 2;

      const angle = 20;
      const rotX = (cardY - pageY) / angle;
      const rotY = (cardX - pageX) / -angle;

      el.style.transform = `translate3d(0%, 0%, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    };

    const perspective =
      getComputedStyle(cards[0].parentElement)
        .getPropertyValue("perspective")
        .replace("px", "") || 800;

    const onCardMove = (ev) => onMove(ev, ev.target);
    const onHover = (ev) => ev.target.addEventListener("mousemove", onCardMove);
    const onOut = (ev) => {
      resetTransform(ev.target, perspective);
      ev.target.removeEventListener("mousemove", onCardMove);
    };

    [...cards].forEach((card) => {
      card.addEventListener("mouseover", onHover);
      card.addEventListener("mouseout", onOut);
    });

    return () => {
      [...cards].forEach((card) => {
        card.removeEventListener("mouseover", onHover);
        card.removeEventListener("mouseout", onOut);
      });
    };
  }, []);

  return (
    <div className="w-80 h-96 bg-blue-900 rounded-lg shadow-md relative overflow-hidden transform hover:z-10 hover:scale-110 transition-transform duration-100 card">
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: "url(https://images.pokemontcg.io/smp/SM156.png)",
        }}
      ></div>
      <div className="absolute inset-0 z-1"></div>
      <div className="absolute inset-0 z-2 bg-gradient-to-br from-transparent via-blue-500 to-pink-500 bg-blend-color-dodge opacity-0 animate-holoGradient"></div>
      <div
        className="absolute inset-0 z-3 bg-center bg-no-repeat bg-cover mix-blend-color-dodge opacity-0 animate-holoSparkle"
        style={{
          backgroundImage:
            'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/13471/sparkles.gif")',
        }}
      ></div>
    </div>
  );
};

export default CardComponent;
