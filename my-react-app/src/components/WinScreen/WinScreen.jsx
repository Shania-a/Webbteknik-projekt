import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

const WinSceen = ({ show, handleClose, date, timeTaken }) => {

    const navigate = useNavigate();

    const handleGoToArchive = () => {
        handleClose();
        navigate('/archive');
    };

    return (
        <>
        {show && (
                <Confetti
                    numberOfPieces={200}
                    recycle={true} 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 2000 
                    }}
                />
            )}
        <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header className="bg-primary bg-dark text-light">
                <Modal.Title>Win</Modal.Title>
            </Modal.Header>

            <Modal.Body className="text-center py-4 bg-dark text-light">
                <p className="lead">Wow you finished:</p>
                <p className="lead"><strong>{date}</strong>.</p>
                <p className="lead">Time:</p>
                <p className="text-info fw-bold fs-5">{timeTaken}</p>
            </Modal.Body>
            <Modal.Footer className="justify-content-center bg-dark text-light">
                <Button variant="outline-light" onClick={handleClose}>
                    Stay Here
                </Button>
                <Button variant="primary" onClick={handleGoToArchive}>
                    Go to Archive
                </Button>
            </Modal.Footer>
            
        </Modal>
        </>
    );
};

export default WinSceen;