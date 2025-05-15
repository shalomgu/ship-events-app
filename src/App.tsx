import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import ShipEventsPage from './ShipEvents';


let language = "JavaScript";

function App() {
  const [count, setCount] = useState(0)

  return (
    <ShipEventsPage />
  )
}

export default App
