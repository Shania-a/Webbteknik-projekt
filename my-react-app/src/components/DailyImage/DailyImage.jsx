import React from 'react';
import { useState } from 'react';

import './DailyImage.css';

import Game from '../Game/Game.jsx';

const DailyImage = ({ data }) => {

  if (!data) return null;
  //Determine which image soruce to use
  //If it's a video we use the thumbnail (requires &thumbs=true in API call) otherwise use the standard image
  const imageUrl = data.media_type === 'video' ? data.thumbnail_url : data.url;

  return (
    <div className="game-board">

        {/*Lil sidebar for da hints*/}
        {isPlaying && (
        <div className="sidebar-hints">
          <p className="hints-title">Hints</p>
          <div className="hints-icon-container">
            <div className={`hints-wrapper ${isIconFound ? "is-disabled" : ""}`}>
              <GameIcon />
              <GameIcon />
              <GameIcon />
            </div>
          </div>
        </div>
        )}

      <Game imageUrl={imageUrl} title={data.title} />

      <div className="info-header">
        <h2>{data.title}</h2>
        <p className="image-date">{data.date}</p>
      </div>
      
    </div>
      
    
  );
};

export default DailyImage;