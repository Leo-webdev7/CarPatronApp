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
    /* const [loginCheck, setLoginCheck] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = () => {
            if (Auth.loggedIn()) {
                setLoginCheck(true);  // User is logged in
            } else {
                // If not logged in, log out and redirect
                Auth.logout();
                alert(`Not Logged In/Session Expired!\nPlease Log In`);
                navigate('/');  // Redirect to login page
            }
        };
        checkLogin();
    }, [navigate]);

    if (!loginCheck) {
        return null;  // Render nothing until login check is done
    } */

    return (
        <div className="welcome-wrap">
            <HeaderSmall />
            <Header />
            <body className='mainMenu'>
                <div className="icon-grid">
                    <div className='menuButton'>
                        <div><a href=""><img src={profile} alt="" className='menuIcon'/></a></div>
                        <p className='menuButtonText'>Profile</p>
                    </div>
                    <div className='menuButton'>
                        <div><a href=""><img src={clock} alt="" className='menuIcon'/></a></div>
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
                        <div><a href=""><img src={money} alt="" className='menuIcon'/></a></div>
                        <p className='menuButtonText'>Expense Rec.</p> 
                    </div>
                </div>
            </body>
        </div>
    )
}

export default HomePage;