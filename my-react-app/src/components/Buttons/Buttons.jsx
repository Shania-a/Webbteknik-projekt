import Button from 'react-bootstrap/Button';

function Buttons({text}) {
  return (
    <>
      <Button variant="dark" className="me-2">{text}</Button>
    </>
  );
}

export default Buttons;