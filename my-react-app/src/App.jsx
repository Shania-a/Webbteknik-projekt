import { useState, useEffect, useMemo } from 'react';
import { RouterProvider, createBrowserRouter, Outlet, useLocation } from 'react-router-dom';

import './App.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Navbar from './components/Navbar/Navbar.jsx';
import DailyImage from './components/DailyImage/DailyImage.jsx';
import About from './components/About/About.jsx';
import ArchiveSelect from './components/ArchiveSelect/ArchiveSelect.jsx'; 
import UserManagement from './components/UserManagement/UserManagement.jsx';

function RootLayout({ nasaData, archiveData, handlePreviousDay }) {
  const location = useLocation();
  const currentData = location.pathname === '/archive' ? archiveData : nasaData;

  return (
    <Container style={{ marginTop: '20px' }}>
      <Row>
          <Navbar handlePreviousDay={handlePreviousDay} />
      </Row>
      <Row>
        <Col style={{ marginTop: '20px' }}>
          <Outlet />
          <Row className="w-100 justify-content-center">
            <Col md={8} className="d-flex justify-content-center">
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}


async function getAPIData(date = "") {
  const api_key = import.meta.env.VITE_NASA_API_KEY; 
  const baseUrl = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&thumbs=true`;
  const finalUrl = date ? `${baseUrl}&date=${date}` : baseUrl;

  const response = await fetch(finalUrl);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error?.message || 'NASA API request failed');
  }
  return result;
}

function App() {
  const [nasaData, setNasaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [archiveData, setArchiveData] = useState(null);
  const [archiveLoading, setArchiveLoading] = useState(false);

  useEffect(() => {
    async function startFetch() {
      setLoading(true);
      setError(null);
      try {
        const result = await getAPIData(); 
        setNasaData(result);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Unable to load NASA data.');
      } finally {
        setLoading(false);
      }
    }
    startFetch();
  }, []);

  const handleArchiveSubmit = async (dateString) => {
    //Fetch the API data using the date sent from Archive
    setArchiveLoading(true);
    setError(null);
    try {
      const result = await getAPIData(dateString); 
      setArchiveData(result); 
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unable to load archive image.');
      setArchiveData(null);
    } finally {
      setArchiveLoading(false);
    }
  };

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
    setError(null);
    // Fetch the image from the API and update the state corresponding to the users current route
    try {
      const result = await getAPIData(previousDay); 
      if (currentPath === '/archive') {
        setArchiveData(result); 
      } else {
        setNasaData(result);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unable to load previous day image.');
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
              {!loading && nasaData && <DailyImage data={nasaData} />}
              {!loading && nasaData && <About data={nasaData} />}
            </>
          )
        },
          {
            path: "/archive",
            element: (
              <Row>
                <Col className="text-center">
                  {archiveLoading && ( <> <p>Loading archive image...</p> <div className="space-spinner"></div> </> )}
                  <ArchiveSelect onDateSubmit={handleArchiveSubmit} />
                  {!archiveLoading && archiveData && <DailyImage data={archiveData} />}
                  {archiveData && !archiveLoading && <About data={archiveData} />}
                </Col>
              </Row>
            )
          },
          {
            path: "/users",
            element: (
              <Row>
                <Col className="text-center">
                  <UserManagement/>
                </Col>
              </Row>
            )
          }
        ]
      }
    ]);
  }, [nasaData, archiveData, archiveLoading, handlePreviousDay]); 

  // Snygga laddningsskärmen
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="space-spinner"></div>
        <p>Hämtar rymden hehe...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-screen">
        <div className="space-spinner"></div>
        <p>{error}</p>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;