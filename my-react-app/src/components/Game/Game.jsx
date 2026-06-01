import React, { useState } from 'react';
import GameForm from '../GameForm/GameForm.jsx';
import GameIcon from '../GameIcon/GameIcon.jsx';
import starArtifact from '../../Assets/Images/star.png';
import amongus from '../../Assets/Images/amongus.png';


const Game = ({ imageUrl, title, date }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showForm, setShowForm] = useState(false);

    // Separate states to track if icons are found
    const [starFound, setStarFound] = useState(false);
    const [amongusFound, setAmongusFound] = useState(false);

    const userString = localStorage.getItem("game-user");
    const userObject = userString ? JSON.parse(userString) : null;

    //Function runs when the form is valid and saved
    const handleGameStart = () => {
        setShowForm(false); //Hides completed form
        setIsPlaying(true); //Removes the blur
    }

    // Checks everytime an icon is found
    const checkGameCompletion = (isStar, isAmongus) => {
        // If all icons are found
        if (isStar && isAmongus) {
            if (userObject) {
                //Check so that the current dates doesn't already exist in the array
                if (!userObject.completedDates.includes(date)) {
                    //Add the current date to the array of completed dates
                    userObject.completedDates.push(date);
                    //Stringify the updated user-object and save it to localstorage again
                    localStorage.setItem("game-user", JSON.stringify(userObject));
                    console.log(userObject);
                }
            }
        }
    }
};

const handlePlayClick = () => {
    if (userObject) {
        setIsPlaying(true);
    } else {
        setShowForm(true);
    }
};

return (
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
                            {/* Star hint */}
                            <div className={starFound ? "is-disabled" : ""}>
                                <GameIcon imageSrc={starArtifact} />
                            </div>
                            {/* Amongus hint */}
                            <div className={amongusFound ? "is-disabled" : ""}>
                                <GameIcon imageSrc={amongus} />
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
                        <>
                            {/* Star artifact */}
                            {!starFound && (
                                <img
                                    src={starArtifact}
                                    alt="Hidden Star" //lowkey not needed cus the image is hidden anyway
                                    className="hidden-artifact-icon"
                                    onClick={() => {
                                        setStarFound(true);
                                        checkGameCompletion(true, amongusFound);
                                    }}
                                />
                            )}

                            {/* Amongus artifact */}
                            {!amongusFound && (
                                <img
                                    src={amongus}
                                    alt="Hidden Amongus"
                                    className="hidden-artifact-icon"
                                    onClick={() => {
                                        setAmongusFound(true);
                                        checkGameCompletion(starFound, true);
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

                </div>
            </div>

        </div >
    );


export default Game;