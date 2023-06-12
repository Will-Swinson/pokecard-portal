import React, { useState, useEffect } from "react";

export default function AnimatedText() {
  const words = ["Revolutionary", "Optimal", "Sturdy"];
  const [currentWord, setCurrentWord] = useState("");
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowText(false);
      setTimeout(() => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setCurrentWord(randomWord);
        setShowText(true);
      }, 500); // Adjust this value to control the fade duration
    }, 3000); // Adjust this value to control the duration between word changes

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <p
      className={`transition-opacity duration-1000 ${
        showText ? "opacity-100" : "opacity-0"
      }`}
    >
      {currentWord}
    </p>
  );
}
