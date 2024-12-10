import '../App.css';
import HeaderSmall from '../components/HeaderSmall';
// import logo from '../assets/logo/car-patron-logo.png';
import profile from '../assets/icons/profile-circle.svg';
import clock from '../assets/icons/clock-alarm.svg';
import Header from '../components/Header';
import vehicle from '../assets/icons/vehicle.svg';
import service from '../assets/icons/service.svg';
import vehicle1 from '../assets/icons/vehicle1.svg';
import money from '../assets/icons/money.svg';
// import Footer from "../components/Footer";
//import Nav2 from "../components/Nav2"
// import Nav from "../components/Nav"
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Auth from '../utils/auth';
// import Nav from "../components/Nav";



function HomePage () {
    return (
        <div className="welcome-wrap">
            <Header />
            <body className='mainMenu'>
                <div className="icon-grid">
                    <div className='menuButton'>
                        <div><a href="/ProfilePage"><img src={profile} alt="" className='menuIcon'/></a></div>
                        <p className='menuButtonText'>Profile</p>
                    </div>
                    <div className='menuButton'>
                        <div><a href="/Reminders"><img src={clock} alt="" className='menuIcon'/></a></div>
                        <p className='menuButtonText'>Reminders</p>
                    </div>
                    <div className='menuButton'>
                        <div><a href=""><img src={vehicle} alt="" className='menuIcon'/></a></div>
                        <p className='menuButtonText'>Vehicle Details</p>
                    </div>
                    <div className='menuButton'>
                        <div><a href=""><img src={service} alt="" className='menuIcon'/></a></div>
                        <p className='menuButtonText'>Service Records</p> 
                    </div>
                    <div className='menuButton'>
                        <div><a href=""><img src={vehicle1} alt="" className='menuIcon'/></a></div>
                        <p className='menuButtonText'>Vehicle</p> 
                    </div>
                    <div className='menuButton'>
                        <div><a href="VehicleExpenses"><img src={money} alt="" className='menuIcon'/></a></div>
                        <p className='menuButtonText'>Expense Rec.</p> 
                    </div>
                </div>
            </body>
        </div>
    )
}

export default HomePage;