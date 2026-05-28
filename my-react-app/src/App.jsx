import { useState, useEffect } from 'react';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';

import './App.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Container from 'react-bootstrap/Container';

import Navbar from './components/Navbar/Navbar.jsx';
import DailyImage from './components/DailyImage/DailyImage.jsx'
import Archive from './components/Archive/Archive.jsx'; 

// API-hämtningen (Helt oförändrad och superbra)
async function getAPIData(date = "") {
  const api_key = import.meta.env.VITE_NASA_API_KEY; 
  const baseUrl = `https://api.nasa.gov/planetary/apod?api_key=${api_key}`;
  const finalUrl = date ? `${baseUrl}&date=${date}` : baseUrl;

  const response = await fetch(finalUrl);
  return await response.json();
}

function App() {
  const [nasaData, setNasaData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function startFetch() {
      setLoading(true);
      const result = await getAPIData(); 
      setNasaData(result); 
      setLoading(false);
    }
    startFetch();
  }, []);

  // Snygga laddningsskärmen
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        
        <Container style={{ marginTop: '20px' }}>
          <Row>
            <Col><h1>Spacefullness</h1></Col>
          </Row>
          <Row>
            <Col>
              <Navbar />
            </Col>
          </Row>
          <Row>
            <Col style={{ marginTop: '20px' }}>
              <Outlet /> 
            </Col>
          </Row>
          
        </Container>
      ),
      children: [
        {
          path: "/",
          element: (
            <>
              {nasaData && <DailyImage data={nasaData} />}
            </>
          )
        },
        {
          path: "/arkiv",
          element: (
            <Row>
              <Col className="text-center">
                <Archive />
              </Col>
            </Row>
          )
        }
      ]
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;