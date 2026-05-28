import React from 'react';
import './DailyImage.css';

const DailyImage = ({ data }) => {
  if (!data) return null;

  // Ta reda på vilken bildkälla som ska användas.
  // Om det är en video använder vi tumnageln (kräver &thumbs=true i API-anropet), annars den vanliga bilden.
  const imageUrl = data.media_type === 'video' ? data.thumbnail_url : data.url;

  return (
    <div className="game-board">
      <div className="info-header">
        <h2>{data.title}</h2>
        <p className="image-date">{data.date}</p>
      </div>

      {/* Spelplanen */}
      <div className="image-stage">
        
        {/* Den suddiga bakgrundsbilden */}
        <img 
          src={imageUrl} 
          alt="" 
          className="blur-bg" 
          aria-hidden="true" 
        />

        {/* Behållaren för bilden där "Waldo" kommer placeras */}
        <div className="image-wrapper">
          <img 
            src={imageUrl} 
            alt={data.title} 
            className="sharp-fg" 
          />
        </div>

      </div>

      <div className="image-explanation">
        <p>{data.explanation}</p>
      </div>
    </div>
  );
};

export default DailyImage;