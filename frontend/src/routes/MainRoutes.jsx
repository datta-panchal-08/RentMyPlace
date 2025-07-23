import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../pages/Login'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import PlaceDetails from '../pages/PlaceDetails'
import IsAuthenticated from './isAuthenticated'
import CreateListing from '../pages/CreateListing'
import MyListings from '../pages/MyListings'
import MyBookings from '../pages/MyBookings'


const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/place/:id' element={<IsAuthenticated>
                <PlaceDetails/>
            </IsAuthenticated>}/>
            <Route path='/add-place' element={<IsAuthenticated>
                <CreateListing/> 
            </IsAuthenticated>}/>
            <Route path='/listings' element={<IsAuthenticated>
                <MyListings/>
            </IsAuthenticated>}/>
            <Route path='/bookings' element={<IsAuthenticated>
              <MyBookings/>
            </IsAuthenticated>}/>

        </Routes>
    )
}

export default MainRoutes