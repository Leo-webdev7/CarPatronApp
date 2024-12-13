// pages/SignupPage.js
import {useEffect} from 'react';
import '../App.css'; 
import SignUpForm from '../components/SignUpForm.js';
import Header from '../components/Header.js';

const SignUpPage = () => {
   useEffect(() => {
        document.body.classList.add('custom-body');
    }, []);
    
  return (
  <>
    <div className="signup-page">
      <Header />
      <SignUpForm/>
    </div>
  </> 
  );
};

export default SignUpPage;
