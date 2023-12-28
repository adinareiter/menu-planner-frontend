import React, { useState, useEffect } from "react";

const Typewriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typingEffect = () => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setCurrentText((prevText) => prevText + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, delay);

        return () => clearTimeout(timeout);
      }
    };

    typingEffect();
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
};

export default Typewriter;
