import {useEffect} from 'react';
// pages/LoginPage.js
import '../App.css'; 
import LoginForm from '../components/LoginForm.js';
import Header from '../components/Header.js';

const LoginPage = () => {
  useEffect(() => {
    document.body.classList.add('custom-body');
  }, []);
  return (
    <>
    <div className="login-page">
      <Header />
      <h1>Login to Car Patron</h1>
      <LoginForm />
      <p>Login or <a href="/SignupPage">Signup</a> Now</p>
    </div>
    </>
  );
};

export default LoginPage;

