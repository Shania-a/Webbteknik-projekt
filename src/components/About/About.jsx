import React, { useState } from 'react';
import './About.css';
import { Nav } from 'react-bootstrap';

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
      <div className="about-content">
        
        {/* Headern som lägger titeln till vänster och flikarna till höger */}
        <div className="about-box-header">
          <h2 className="about-title">About</h2>
          
          {/* React Bootstraps inbyggda flik-komponent */}
          <Nav 
            variant="pills" 
            activeKey={activeTab} 
            onSelect={(selectedKey) => setActiveTab(selectedKey)}
            className="bg-black bg-opacity-25 p-1 rounded"
          >
            <Nav.Item>
              <Nav.Link eventKey="site" className="text-light py-1 px-3 small">
                Site Info
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="pic" className="text-light py-1 px-3 small">
                Pic Info
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        {/* Textinnehållet under flikarna */}
        <div className="tab-panel-body">
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
            <div className="tab-panel">
              <p className="pic-explanation">
                {data?.explanation || "No explanation available for this date."}
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
    );
}

export default AboutSection;