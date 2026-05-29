import { useState, useEffect, useMemo } from 'react';
import { RouterProvider, createBrowserRouter, Outlet, useLocation } from 'react-router-dom';

import './App.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Navbar from './components/Navbar/Navbar.jsx';
import DailyImage from './components/DailyImage/DailyImage.jsx';
import ArchiveSelect from './components/ArchiveSelect/ArchiveSelect.jsx'; 
import AboutSection from './components/About/About.jsx';

function RootLayout({ nasaData, archiveData, handlePreviousDay }) {
  const location = useLocation();
  const currentData = location.pathname === '/archive' ? archiveData : nasaData;

  return (
    <Container style={{ marginTop: '20px' }}>
      <Row>
      </Row>
      <Row>
        <Col>
          <Navbar handlePreviousDay={handlePreviousDay} />
        </Col>
      </Row>
      <Row>
        <Col style={{ marginTop: '20px' }}>
          <Outlet />
          <Row className="w-100 justify-content-center">
            <Col md={8} className="d-flex justify-content-center">
              <AboutSection data={currentData} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

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
  const [archiveData, setArchiveData] = useState(null);
  const [archiveLoading, setArchiveLoading] = useState(false);

  // Function to change date wether by archieve or previous day
  async function changeDate(newDate = "") {
    setLoading(true);
    const result = await getAPIData(newDate);
    setNasaData(result);
    setLoading(false);
  }

  async function changeArchiveDate(newDate = "") {
    setArchiveLoading(true);
    const result = await getAPIData(newDate);
    setArchiveData(result);
    setArchiveLoading(false);
  }

  // Fetching the daily image
  useEffect(() => {
    changeDate();
  }, []);

  const handlePreviousDay = async (currentPath) => {
    const currentData = currentPath === '/archive' ? archiveData : nasaData;
    if (!currentData || !currentData.date) return;
    console.log(currentData.date)
    // Reformat the current date back into regular date() so we can have correct calendar handling for instance: 1th of May -1 = 30 April
    const currentDate = new Date(currentData.date);
    currentDate.setDate(currentDate.getDate() - 1);
    // Date looks like this 2026-05-28T12:48:20.000Z atm
    // Reformat into a string splitting the date at T and use index 0 to get clean date string for instance 2016-04-04
    const previousDay = currentDate.toISOString().split('T')[0];

    console.log(previousDay);

    setArchiveLoading(true);
    // Fetch the image from the API and update the state corresponding to the users current route
    try {
      const result = await getAPIData(previousDay); 
      if (currentPath === '/archive') {
        setArchiveData(result); 
      } else {
        setNasaData(result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setArchiveLoading(false);
    }
  };

  const router = useMemo(() => {
    return createBrowserRouter([
    {
      path: "/",
      element: <RootLayout nasaData={nasaData} archiveData={archiveData} handlePreviousDay={handlePreviousDay} />,
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
            path: "/archive",
            element: (
              <Row>
                <Col className="text-center">
                  <ArchiveSelect changeDate={changeArchiveDate} />
                  {archiveLoading && <p>Loading archive image...</p>}
                  {archiveData && <DailyImage data={archiveData} />}
                </Col>
              </Row>
            )
          },
          {
            path: "/previous",
            element: (
              <Row>
                <Col className="text-center">
                  <h1>Pizza</h1>
                  <Outlet context={{ handlePreviousDay }} />
                </Col>
              </Row>
            )
          }
        ]
      }
    ]);
  }, [nasaData, archiveData, archiveLoading]); 


  if (loading) {
    return (
      <div className="loading-screen">
        <img 
          src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Floading-symbol-vector_427757-728.jpg%3Fw%3D2000&f=1&nofb=1&ipt=081322b4315587828aa42c0487603103677eb4efe9993342aa78e1a8a9826472' 
          style={{ maxWidth: '150px' }} 
          alt="Laddar..."
        />
        <p>Loading space...</p>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;