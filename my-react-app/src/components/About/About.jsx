import React, { useState } from 'react';
import './About.css';

function AboutSection({ data }) {
    // state to manage the visibility of of the active tab of site- or pic info
    const [activeTab, setActiveTab] = useState('site');

    let leftButtonClass = "tab-btn left-btn";
    let rightButtonClass = "tab-btn right-btn";

    if (activeTab === 'site') {
        leftButtonClass = "tab-btn left-btn active"; // adding active to className if site is clicked
    } else if (activeTab === 'pic') {
        rightButtonClass = "tab-btn right-btn active"; // adding active to className if pic is clicked
    }

    return (
        <section className="about-section">
            <div className="tab-container">
                <button
                    className={leftButtonClass}
                    onClick={() => setActiveTab('site')}>
                    Site Info
                </button>

                <h2 className="about-title">About</h2>

                <button
                    className={rightButtonClass}
                    onClick={() => setActiveTab('pic')}>
                    Pic Info
                </button>
            </div>

            <div className="about-content">
                {activeTab === 'site' ? (
                    <div className="tab-panel">
                        <p>
                            Welcome to <strong>Spacefullness</strong>! This is a relaxing hidden-object game
                            using NASA's Astronomy Picture of the Day. Look closely at the stars,
                            nebulae, and galaxies to find the hidden objects.
                        </p>
                        <h4>How to play</h4>
                        <p>
                            1. Click "Play" to start.<br />
                            2. Use hints if you get stuck.<br />
                            3. Complete the daily image to log your time!
                        </p>
                    </div>

                ) : (

                    <p>{data.explanation}</p>
                )}
            </div>
        </section>
    );
}

export default AboutSection;