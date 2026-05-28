import Form from 'react-bootstrap/Form';
import Buttons from '../Buttons/Buttons.jsx';
import { useState } from 'react';

function GameForm ({ onStartGame }) {

    const [username, setUsername] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();

        if (username.trim().length > 0) {
           localStorage.setItem("game-username", username); 
            //create new user as object with random ID
           onStartGame();
        } else {
            alert("Please enter a username to play!");
        }
    };

    return (
        <div className="form-overlay">
            <Form onSubmit={handleSubmit} className="bg-dark p-4 rounded text-light shadow-lg">
                <h4 className="mb-3 text-center">Who's playing?</h4>

                <Form.Group className="mb-3">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter username here"
                    value={username}
                    onChange={e => setUsername(e.target.value)} 
                    />
                    <Form.Text className="text-muted">
                    Your username will only be saved to your Localstorage!
                    </Form.Text>
                </Form.Group>

                <div className="text-center">
                    <Buttons type="submit" text="Save and Start!" />
                </div>
            </Form>
        </div>
    );
}

export default GameForm;