import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import './GameIcon.css';
import star from '../../Assets/images/star.png';

function GameIcon() {
  return (
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image src={star} alt="Test star" className="game-icon" roundedCircle />
        </Col>
      </Row>
    </Container>
  );
}

export default GameIcon;