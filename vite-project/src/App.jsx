import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./assets/sass/main.css"
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

export default function App() {

  const [admin, setadmin] = useState(true)

  return (
    <BrowserRouter>
    <div className='app-body'>
<Routes>
  <Route path='/' element={<Login setadmin={setadmin} />}></Route>
  <Route path='/dashboard' element={<Dashboard admin={admin} />}></Route>
</Routes>
    </div>
    </BrowserRouter>
    
  )
}
