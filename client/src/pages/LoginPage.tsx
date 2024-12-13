import {useEffect} from 'react';
// pages/LoginPage.js
import '../App.css'; 
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';

const LoginPage = () => {
  useEffect(() => {
    document.body.classList.add('custom-body');
  }, []);
  return (
    <>
    <div className="login-page">
      <Header />
      <LoginForm />
      <p>Login or <a href="/SignupPage">Signup</a> Now</p>
    </div>
    </>
  );
};

export default LoginPage;

