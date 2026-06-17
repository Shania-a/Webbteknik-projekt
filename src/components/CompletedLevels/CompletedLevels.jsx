import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './CompletedLevels.css';

const CompletedLevels = ({ completedDates }) => {
    if (!completedDates || completedDates.length === 0) {
        return <p>No completed levels yet! Go out and explore the galaxy!</p>
    }
    return (
        <ListGroup className="completed-list">
            {completedDates.map((game, index) => (
                <ListGroup.Item
                    key={index}
                    className="completed-item d-flex flex-column align-items-center mb-2 bg-dark text-light border-secondary rounded"
                
                >
                <div className="completed-info">
                    <h5 className="mb-0">{game.title}</h5>
                    <p className="small">{game.date}</p>
                    {/*If there is a stopwatch-time, include it */}
                    <p className="small">{game.timeTaken}</p>
                </div>
                <img
                    className="completed-img"
                    src={game.imageUrl}
                    alt={game.title}
                    />
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default CompletedLevels;