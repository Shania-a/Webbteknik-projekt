import React from 'react';
import Image from 'react-bootstrap/Image';
import './GameIcon.css';

function GameIcon({ iconSrc, altText = "Hint icon" }) {
  return (
    <Image 
      src={iconSrc} 
      alt={altText} 
      className="game-icon" 
      roundedCircle 
    /> 
  );
}

export default GameIcon;