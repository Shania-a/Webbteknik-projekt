import React from 'react';
import './GameIcon.css';

const GameIcon = ({ imageSrc }) => {
  return (
    <img 
    src={imageSrc} 
    className="game-icon"
    alt="Hint" /> 
  );
};

export default GameIcon;