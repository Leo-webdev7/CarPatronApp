// pages/SignupPage.js
import logo from '../assets/logo/car-patron-logo.png';
import '../App.css'; 
import SignupForm from './components/SignupForm';

const SignupPage = () => {
  return (
  <>
    <div className="signup-page">
      <header>
        <a href="/"><img src={logo}  alt="Car Patron - Vehicle Maintenance Management Application" className="logo" /></a>
        <h1>Welcome!!</h1>
      </header>
      <SignupForm/>
    </div>
  </> 
  );
};

export default SignupPage;
