// pages/LoginPage.js
import logo from '../assets/logo/car-patron-logo.png';
import '../App.css'; 
import LoginForm from './components/LoginForm';


const LoginPage = () => {
  return (
    <>
    <div className="login-page">
      <header>
        <a href="/"><img src={logo}  alt="Car Patron - Vehicle Maintenance Management" className="logo" /></a>
      </header>
      <LoginForm />
    </div>
    </>
  );
};

export default LoginPage;

