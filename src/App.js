import React from 'react'
import Floorplanlayout from './PAGES/Floorplanlayout'
import './app.css'
import Table from './Components/Table'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
       <Routes>
        <Route path="/" element={<Table />} /> 
        <Route path="/add-floor-plan" element={<Floorplanlayout />} /> 
      </Routes>
      
    </div>
  )
}

export default App
