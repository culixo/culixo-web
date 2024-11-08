// hooks/useRandomBackground.js
import { useEffect, useState } from "react";

const useRandomBackground = () => {
  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/randomImage");
        const images = await response.json();

        // Select a random image
        const randomIndex = Math.floor(Math.random() * images.length);
        setRandomImage(images[randomIndex]);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };

    fetchImages();
  }, []);

  return randomImage;
};

export default useRandomBackground;
