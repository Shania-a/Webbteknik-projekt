import { useState, useEffect } from 'react'
import './App.css'
import Test from './components/Test/Test.jsx'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import NavbarTest from './components/Test/NavbarTest/NavbarTest.jsx';
import DailyImage from './components/DailyImage/DailyImage.jsx'

// Vi gör funktionen flexibel genom att tillåta att ett datum skickas med
async function getAPIData(date = "") {
  const api_key = import.meta.env.VITE_NASA_API_KEY; 
  
  // URL baserat på om ett specifikt datum skickats med eller inte
  const baseUrl = `https://api.nasa.gov/planetary/apod?api_key=${api_key}`;
  const finalUrl = date ? `${baseUrl}&date=${date}` : baseUrl;

  const response = await fetch(finalUrl);
  const jsonData = await response.json();

  return jsonData;
}

function App() {
  const [nasaData, setNasaData] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function startFetch() {
    setLoading(true);

    // För att hämta datan och vänta tills den är klar
    const result = await getAPIData(); 
    setNasaData(result); 

    // Sen stänger vi av laddningsskärmen direkt efter att datan sparats
    setLoading(false);
  }
  
  startFetch();
}, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <img 
          src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Floading-symbol-vector_427757-728.jpg%3Fw%3D2000&f=1&nofb=1&ipt=081322b4315587828aa42c0487603103677eb4efe9993342aa78e1a8a9826472' 
          style={{ maxWidth: '150px' }} 
          alt="Laddar..."
        />
        <p>Hämtar rymden hehe...</p>
      </div>
    );
  }

  return (
    <Container>
      <Row>
        <Col><h1>Spacefullness</h1></Col>
      </Row>
      <Row>
        <Col>
            {nasaData ? (
            <div>
              <img src={nasaData.url} />
            </div>
            ) : (
            <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Floading-symbol-vector_427757-728.jpg%3Fw%3D2000&f=1&nofb=1&ipt=081322b4315587828aa42c0487603103677eb4efe9993342aa78e1a8a9826472' style={{maxWidth: '100%'}}/>
            )}
             {nasaData && <DailyImage data={nasaData} />}
        </Col>
      </Row>
      <Row>
        <Col>
            <NavbarTest />
        </Col>
      </Row>
    </Container>
    
    
  );
}
   


export default App