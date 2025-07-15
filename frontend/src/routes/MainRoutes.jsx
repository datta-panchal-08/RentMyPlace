import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../pages/Login'
import Home from '../pages/Home'
import Signup from '../pages/Signup'

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup/>} />
        </Routes>
    )
}

export default MainRoutes