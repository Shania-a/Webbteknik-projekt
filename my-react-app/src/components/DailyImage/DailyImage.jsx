import React from 'react';
import { useState } from 'react';

import './DailyImage.css';

import Game from '../Game/Game.jsx';

const DailyImage = ({ data }) => {

  if (!data) return null;
  // Ta reda på vilken bildkälla som ska användas.
  // Om det är en video använder vi tumnageln (kräver &thumbs=true i API-anropet), annars den vanliga bilden.
  const imageUrl = data.media_type === 'video' ? data.thumbnail_url : data.url;

  return (
    <div className="game-board">


      <Game imageUrl={imageUrl} title={data.title} />

      <div className="info-header">
        <h2>{data.title}</h2>
        <p className="image-date">{data.date}</p>
      </div>
      
    </div>
      
    
  );
};

export default DailyImage;