import React, { useState } from 'react';
import GameForm from '../GameForm/GameForm.jsx';
import GameIcon from '../GameIcon/GameIcon.jsx';
import starArtifact from '../../Assets/Images/star.png';

const Game = ({ imageUrl, title }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isIconFound, setIsIconFound] = useState(false);

    const hasSavedUser = localStorage.getItem("game-username");

     //Function runs when the form is valid and saved
    const handleGameStart = () => {
    setShowForm(false); //Hides completed form
    setIsPlaying(true); //Removes the blur
    }

    const handleFindIcon = () => {
    setIsIconFound(true);
    alert("GG WP, you found it!");
    }

    const handlePlayClick = () => {
    if (hasSavedUser) {
      setIsPlaying(true);
    } else {
      setShowForm(true);
    }};

    return(
        <div className="game-board">
            {/* Spelplanen */}
            <div className="image-stage">

            {/* Den suddiga bakgrundsbilden */}
            <img
            src={imageUrl}
            alt=""
            className="blur-bg"
            aria-hidden="true"
            />

            {/*Lil sidebar for da hints*/}
            {isPlaying && (
            <div className="sidebar-hints">
                <p className="hints-title">Hints</p>
                <div className="hints-icon-container">
                    <div className={`${isIconFound ? "is-disabled" : ""}`}>
                        <GameIcon />
                    </div>
                </div>
            </div>
            )}

            {/* Behållaren för bilden där "Waldo" kommer placeras */}
            <div className="image-wrapper">
                <img
                    src={imageUrl}
                    alt={title}
                    className={`sharp-fg ${isPlaying ? "" : "is-blurred"}`}
                />

                {/*Placing the hidden icon only when the game is ongoing/started */}
                {isPlaying && (
                    <img 
                    src={starArtifact}
                    alt="Hidden Icon" //lowkey not needed cus the image is hidden anyway
                    className="hidden-artifact-icon"
                    onClick={handleFindIcon}
                    />
                )}

                {/* Play-button test, only shows if the user is not playing or sees the form*/}
                {!isPlaying && !showForm && (
                    <div className="play-overlay" onClick={handlePlayClick}>
                    <span className="play-icon">▶</span>
                    </div>
                )}

                {/*Form only visible if showForm is true */}
                {showForm && (
                    <GameForm onStartGame={handleGameStart} />
                )}

            </div>
        </div>

    </div>
    );
}

export default Game;