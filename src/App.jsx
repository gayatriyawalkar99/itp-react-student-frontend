import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import AddStudentForm from './Pages/AddStudentForm'
import ShowStudents from './Pages/ShowStudents'
import Navbar from './Pages/Navbar'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import EditStudentForm from './Pages/EditStudentForm.jsx'
import ViewStudentForm from './Pages/ViewStudentForm.jsx'
function App() {


  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/add' element={<AddStudentForm />} />
          <Route path='/show' element={<ShowStudents />} />
           <Route path='/edit/:id' element={<EditStudentForm />} />
            <Route path='/view/:id' element={<ViewStudentForm />} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
