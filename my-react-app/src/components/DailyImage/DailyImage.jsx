import React from 'react';
import { useState } from 'react';
import './DailyImage.css';
import GameForm from '../GameForm/GameForm.jsx';

const DailyImage = ({ data }) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [showForm, setShowForm] = useState(false);

  if (!data) return null;

  // Ta reda på vilken bildkälla som ska användas.
  // Om det är en video använder vi tumnageln (kräver &thumbs=true i API-anropet), annars den vanliga bilden.
  const imageUrl = data.media_type === 'video' ? data.thumbnail_url : data.url;

  //Function runs when the form is valid and saved
  const handleGameStart = () => {
    setShowForm(false); //Hides completed form
    setIsPlaying(true); //Removes the blur
  }

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
            className={`sharp-fg ${isPlaying ? "" : "is-blurred"}`} 
          />

          {/* Play-button test, only shows if the user is not playing or sees the form*/}
          {!isPlaying && !showForm && (
            <div className="play-overlay" onClick={() => setShowForm(true)}>
              <span className="play-icon">▶</span>
            </div>
          )}

          {/*Form only visible if showForm is true */}
          {showForm && (
            <GameForm onStartGame={handleGameStart} />
          )}
        </div>

      </div>

      <div className="image-explanation">
        <p>{data.explanation}</p>
      </div>
    </div>
  );
};

export default DailyImage;