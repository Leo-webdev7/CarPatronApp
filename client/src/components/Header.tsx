// pages/LoginPage.js
import logo from '../assets/logo/car-patron-logo.png';
import '../App.css'; 

const Header = () => {
  return (
    <>
      <header>
        <a href="/"><img src={logo}  alt="Car Patron - Vehicle Maintenance Management" className="logo" /></a>
      </header>
    </>
  );
};

export default Header;

