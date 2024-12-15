// pages/LoginPage.js
import logo from '../assets/logo/car-patron-logo.png';
import '../App.css'; 
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import Logout from '../assets/icons/logout.svg';

const HeaderHome = () => {
  const navigate = useNavigate();
  

  const handleLogout = () => {
    Auth.logout();
    console.log('User logged out');
    navigate('/LoginPage'); // Redirect to login page
  };
  return (
    <>
      <header>
        <a href="/"><img src={logo}  alt="Car Patron - Vehicle Maintenance Management" className="logo" /></a>
        <button className="logoutButton" onClick={handleLogout}><img className='logoutPicture' src={Logout} alt="logout" /></button>
      </header>
    </>
  );
};

export default HeaderHome;

