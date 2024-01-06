import React from 'react'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import {Route, Routes} from 'react-router-dom'
import Home from './Components/Home'
import Register from './Components/Register'
export default function App() {
  return (
    <div id='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
      <Footer />
    </div>
  )
}