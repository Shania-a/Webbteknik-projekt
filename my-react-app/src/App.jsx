import { useState, useEffect } from 'react'
import './App.css'
import Test from './components/Test/Test.jsx'



async function getAPIData(){
  const api_key = import.meta.env.VITE_NASA_API_KEY; 
  const date = "2026-01-01";
  // const start = "2000-01-01";
  // const end = "2000-01-07";


  const url = date
    ? await fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${date}`)
    : await fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`);
  const jsonData = await url.json()

  console.log("Data:", jsonData);
  console.log("URL:", jsonData.url);

  return jsonData;
};

function App() {
  const [nasaData, setNasaData] = useState(null);

  // const api_key = import.meta.env.VITE_NASA_API_KEY; 

  //   const url = fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`).then((data) => data.json().then(function(jsonData) {
  //     console.log(jsonData);
      
  //   })
  // );
  // const data = getAPIData()

  useEffect(() => {
    async function startFetch() {
      const result = await getAPIData();
      setNasaData(result); 
    }
    
    startFetch();
  }, []);

  return (
    <>
    <Test/>
    {nasaData ? (
        <div>
          <img src={nasaData.url} />
        </div>
      ) : (
        <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Floading-symbol-vector_427757-728.jpg%3Fw%3D2000&f=1&nofb=1&ipt=081322b4315587828aa42c0487603103677eb4efe9993342aa78e1a8a9826472' style={{maxWidth: '100%'}}/>
      )}
    </>
  )
}

export default App
