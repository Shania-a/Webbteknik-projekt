import Image from 'react-bootstrap/Image';
import './GameIcon.css';
import star from '../../Assets/images/star.png';

function GameIcon() {
  return (
    <Image 
    src={star} 
    alt="Hint star" 
    className="game-icon" 
    roundedCircle /> 
  );
}

export default GameIcon;