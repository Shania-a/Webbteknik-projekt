import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Test from './components/Test/Test.jsx'

const api_key = import.meta.env.VITE_NASA_API_KEY; 

function App() {
  const [count, setCount] = useState(0)
  console.log(api_key)
  return (
    <>
    <Test/>
    </>
  )
}

export default App
