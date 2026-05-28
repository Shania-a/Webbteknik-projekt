import Button from 'react-bootstrap/Button';

function Buttons({text, ...props}) {
  return (
    <>
      <Button variant="dark" className="me-2" {...props}>{text}</Button>
    </>
  );
}

export default Buttons;