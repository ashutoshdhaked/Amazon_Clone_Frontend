import React, { useState ,useEffect} from 'react';
import Slide from '../slidebar/Slide';
import './Sectionbody.css';
const Sectionbody = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
   const images=[
    "https://rukminim1.flixcart.com/flap/1680/280/image/1defb861e409319b.jpg?q=50",
    " https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/8d4150cc4f3f967d.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50"
   ];


   useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [currentIndex, images.length]);


  
   const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div>
    <div className="carousel-container">
      <img className="carousel-image" src={images[currentIndex]} alt={`slide ${currentIndex}`} />
    </div>
     <Slide/>
    </div>
  );
};

export default Sectionbody;
