import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const CompletedLevels = ({ completedDates }) => {
    if (!completedDates || completedDates.length === 0) {
        return <p>No completed levels yet! Go out and explore the galaxy!</p>
    }
    return (
        <ListGroup>
            {completedDates.map((game, index) => (
                <ListGroup.Item
                    key={index}
                    className="d-flex align-items-center mb-2 bg-dark text-light border-secondary rounded"
                
                >
                <div>
                    <h5 className="mb-0">{game.title}</h5>
                    <p className="small">{game.date}</p>
                    {/*If there is a stopwatch-time, include it */}
                    <p className="small">{game.timeTaken}</p>
                </div>
                <img
                    src={game.imageUrl}
                    alt={game.title}
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px'}}></img>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default CompletedLevels;