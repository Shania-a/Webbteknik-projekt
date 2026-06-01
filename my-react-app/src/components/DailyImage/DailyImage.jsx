import React from 'react';
import './DailyImage.css';
import Game from '../Game/Game.jsx';

const DailyImage = ({ data }) => {

  if (!data) return null;
  //Determine which image soruce to use
  //If it's a video we use the thumbnail (requires &thumbs=true in API call) otherwise use the standard image
  const imageUrl = data.media_type === 'video' ? data.thumbnail_url : data.url;

  return (
    <div className="daily-image-container">
      <div className="game-board">

        <Game imageUrl={imageUrl} title={data.title} date={data.date} />

        <div className="info-header">
          <h2>{data.title}</h2>
          <p className="image-date">{data.date}</p>
        </div>
        
      </div>
    </div>
  );
};

export default DailyImage;