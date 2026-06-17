import React, { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import GameForm from '../GameForm/GameForm.jsx';
import GameIcon from '../GameIcon/GameIcon.jsx';
import starArtifact from '../../Assets/Images/star.png';
import './Game.css';
import WinSceen from '../WinScreen/WinScreen.jsx';
import amongusIcon from '../../Assets/Images/amogus.png';
import Button from 'react-bootstrap/Button';

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

    // Keeping trrack of icons
    const [isStarFound, setIsStarFound] = useState(false);
    const [isAmongusFound, setIsAmongusFound] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const [showWinScreen, setShowWinScreen] = useState(false);
    const [gameFinalTime, setGameFinalTime] = useState('');

    //Setting up the hook-stopwatch, false-boolean sets default to stopped
    const { seconds, minutes, start, pause, reset } = useStopwatch({ autoStart: false });

    const userString = localStorage.getItem("game-user");
    const userObject = userString ? JSON.parse(userString) : null;

    //Function runs when the form is valid and saved
    const handleGameStart = () => {
        setShowForm(false); //Hides completed form
        setIsPlaying(true); //Removes the blur
        start(); //Starts the stopwatch
    }

    // For when all conditions for winning are met
    const triggerWin = () => {
        pause(); //"Stops" the stopwatch

        if (userObject) {
            const isAlreadyCompleted = userObject.completedDates.some(item => item.date === date);

            //Check so that the current object/level doesn't already exist in the array
            if (!isAlreadyCompleted) {
                const finalTime = `${minutes} minutes & ${seconds} seconds`;
                setGameFinalTime(finalTime);
                console.log(finalTime);

                //Add the current date to the array of completed dates
                userObject.completedDates.push({
                    date: date,
                    title: title,
                    imageUrl: imageUrl,
                    timeTaken: finalTime
                });

                //Stringify the updated user-object and save it to localstorage again
                localStorage.setItem("game-user", JSON.stringify(userObject));
                console.log(userObject);
            }
        }
        setShowWinScreen(true);
    };

    // When players clicks the star
    const handleFindStar = () => {
        setIsStarFound(true);
        // And if AmongUs is also found, you win!
        if (isAmongusFound) {
            triggerWin();
        }
    };

    // When player clicks the AmongUs
    const handleFindAmongus = () => {
        setIsAmongusFound(true);
        // And if star is also found, you win
        if (isStarFound) {
            triggerWin();
        }
    };

    const handlePlayClick = () => {
        if (userObject) {
            setIsPlaying(true);
            start(); //Start the stopwatch 
        } else {
            setShowForm(true);
        }
    };

    const dateSeed = date;

    //Run seedHash to genererate a random number
    const randomX = seedHash(dateSeed + "X");
    const randomY = seedHash(dateSeed + "Y");

    // Making a second set of coordinates for the second icon using a different seed to ensure they don't overlap
    const randomX2 = seedHash(dateSeed + "X2");
    const randomY2 = seedHash(dateSeed + "Y2");

    // Calculate coordinates in percent 10-90% for css
    const iconX = 10 + (randomX * 80);
    const iconY = 10 + (randomY * 80);

    const iconX2 = 10 + (randomX2 * 80);
    const iconY2 = 10 + (randomY2 * 80);

    console.log("Star:", iconX, iconY);
    console.log("Amongus:", iconX2, iconY2);
    
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
                        {showHint ? (
                            <div className="hints-wrapper" style={{ display: 'flex', gap: '1rem' }}>
                                <div className={isAmongusFound ? "is-disabled" : ""}>
                                    <GameIcon iconSrc={amongusIcon} altText="Among Us Hint" />
                                </div>
                                <div className={isStarFound ? "is-disabled" : ""}>
                                    <GameIcon iconSrc={starArtifact} altText="Star Hint" />
                                </div>
                            </div>
                        ) : (
                            <Button
                                variant="outline-light"
                                className="hint-trigger-btn"
                                onClick={() => setShowHint(true)}
                            >
                                Hint
                            </Button>
                        )}
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

                    {/*Showing the hidden icons only when the game is ongoing/started */}
                    {isPlaying && (
                        <>
                            {/* The star on the map is visible until found */}
                            {!isStarFound && (
                                <img 
                                    src={starArtifact}
                                    alt="" 
                                    className="hidden-artifact-icon"
                                    onClick={handleFindStar}
                                    style={{
                                        left: `${iconX}%`,
                                        top: `${iconY}%`
                                    }}
                                />
                            )}
                            
                            {/* Among Us visible on the map until found */}
                            {!isAmongusFound && (
                                <img 
                                    src={amongusIcon}
                                    alt="" 
                                    className="hidden-artifact-icon2"
                                    onClick={handleFindAmongus}
                                    style={{
                                        left: `${iconX2}%`,
                                        top: `${iconY2}%`
                                    }}
                                />
                            )}
                        </>
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