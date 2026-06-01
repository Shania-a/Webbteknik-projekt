import React, { useState } from 'react';
import GameForm from '../GameForm/GameForm.jsx';
import GameIcon from '../GameIcon/GameIcon.jsx';
import starArtifact from '../../Assets/Images/star.png';
import './Game.css';

const Game = ({ imageUrl, title, date }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isIconFound, setIsIconFound] = useState(false);

    const userString = localStorage.getItem("game-user");
    const userObject = userString ? JSON.parse(userString) : null;

    //Function runs when the form is valid and saved
    const handleGameStart = () => {
    setShowForm(false); //Hides completed form
    setIsPlaying(true); //Removes the blur
    }

    const handleFindIcon = () => {
    setIsIconFound(true);

    if (userObject) {
       //Check so that the current date doesn't already exist in the array
       if (!userObject.completedDates.includes(date)){

        //Add the current date to the array of completed dates
        userObject.completedDates.push(date);

        //Stringify the updated user-object and save it to localstorage again
        localStorage.setItem("game-user", JSON.stringify(userObject));
        console.log(userObject);
       }
    }
    alert("GG WP, you found it!");
    
    };

    const handlePlayClick = () => {
    if (userObject) {
      setIsPlaying(true);
    } else {
      setShowForm(true);
    }};


    const iconX = 30;
    const iconY = 88;
    return(
        <div className="game-board">
            
            {/*The blurry background*/}
            <div className="image-stage">
            
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
                        <GameIcon />
                    </div>
                </div>
            </div>
            )}

            {/*The container in which we place the hidden artifacts*/}
            <div className="image-wrapper">
                <img
                    src={imageUrl}
                    alt={title}
                    className={`sharp-fg ${isPlaying ? "" : "is-blurred"}`}
                />

                {/*Showing the hidden icon only when the game is ongoing/started */}
                {isPlaying && (
                    <img 
                    src={starArtifact}
                    alt="Hidden Icon" //lowkey not needed cus the image is hidden anyway
                    className="hidden-artifact-icon"
                    onClick={handleFindIcon}
                    style={{
                        left: `${iconX}%`,
                        top: `${iconY}%`
                    }}
                    
                    />
                )}

                {/* Play-button, only visible at the main page before any game has started or
                 if a new user hasn't filled out the form yet*/}
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