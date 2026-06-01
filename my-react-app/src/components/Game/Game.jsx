import React, { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import GameForm from '../GameForm/GameForm.jsx';
import GameIcon from '../GameIcon/GameIcon.jsx';
import starArtifact from '../../Assets/Images/star.png';
import './Game.css';
import WinSceen from '../WinScreen/WinScreen.jsx';

// Hashes a a date string and transforms it into a float between 0-1
function seedHash(date) {
    let hash = 0;
    // Hashing algoritm to convert string chars to numeric hash
    for (let index = 0; index < date.length; index++) {
        hash = date.charCodeAt(index) + ((hash << 5) - hash);
    }
    //Use a sine wave to turn our hash into a scrambled number and makes a big number to create more variance 
    const x = Math.sin(hash) * 10000;
    // Return only the decimals
    return x - Math.floor(x);
}

const Game = ({ imageUrl, title, date }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isIconFound, setIsIconFound] = useState(false);
    const [showWinScreen, setShowWinScreen] = useState(false);
    const [gameFinalTime, setGameFinalTime] = useState('');
    //Setting up the hook-stopwatch, false-boolean sets default to stopped
    const { seconds, minutes, start, pause, reset } = useStopwatch({ autoStart:false });

    const userString = localStorage.getItem("game-user");
    const userObject = userString ? JSON.parse(userString) : null;

    //Function runs when the form is valid and saved
    const handleGameStart = () => {
    setShowForm(false); //Hides completed form
    setIsPlaying(true); //Removes the blur
    start(); //Starts the stopwatch
    }

    
    const handleFindIcon = () => {
        setIsIconFound(true);
        pause(); //"Stops" the stopwatch

        if (userObject) {

            const isAlreadyCompleted = userObject.completedDates.some(item => item.date === date);
        //Check so that the current object/level doesn't already exist in the array
        if (!isAlreadyCompleted) {

            const finalTime = `${minutes} minutes & ${seconds} seconds`;
            setGameFinalTime(finalTime)
            console.log(finalTime)

            //Add the current date to the array of completed dates
            userObject.completedDates.push({
                date: date,
                title: title,
                imageUrl: imageUrl,
                timeTaken: finalTime});

            //Stringify the updated user-object and save it to localstorage again
            localStorage.setItem("game-user", JSON.stringify(userObject));
            console.log(userObject);
        }
        }
        setShowWinScreen(true);
    
    };

    const handlePlayClick = () => {
    if (userObject) {
      setIsPlaying(true);
    } else {
      setShowForm(true);
    }};

    const dateSeed = date;

    //Run seedHash to genererate a reandom number
    const randomX = seedHash(dateSeed + "X");
    const randomY = seedHash(dateSeed + "Y");

    // Calculate coordinates in percent 10-90% for css
    const iconX = 10 + (randomX * 80);
    const iconY = 10 + (randomY * 80);

    console.log(iconX, iconY)
    
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
                <WinSceen 
                    show={showWinScreen} 
                    handleClose={() => setShowWinScreen(false)} 
                    date={date}
                    timeTaken={gameFinalTime}
                />
            </div>
        </div>

    </div>
    );
}

export default Game;