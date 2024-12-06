// pages/LoginPage.js
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
// import logo from '../assets/logo/car-patron-logo.png';
import '../App.css'; 
// import LoginForm from './LoginForm';
// import { login } from '../api/authAPI';
import Auth from '../utils/auth';
// import { set } from 'date-fns';


const LoginPage = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
    setErrorMsg(''); 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
      setErrorMsg('');
    }
    catch (error){
      console.error('Failed to login: ', error);
      setErrorMsg('Failed to login. Please check your credentials.');
    }
  };
  
  useEffect(() => {
        const checkLogin = () => {
            if (Auth.loggedIn()) {
                setLoginCheck(true);  // User is logged in
                navigate('/Home');  // Redirect to home page
            }
        };
        checkLogin();
    }, [navigate]);

  return (
    <>
    <div className="login-page">
      <header>
        <a href="/"><img src={logo}  alt="Amygdala - Healing Starts Here" className="logo" /></a>
        <h1>Welcome Back!!</h1>
      </header>
      <form onSubmit={handleSubmit} className="login-wrap">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder='username'
            name='username'
            value={loginData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder='password'
            name='password'
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className='button-container'>
        <button type="submit">Login</button>
        </div>
        <a href="/SignUpPage" className='signup'>Sign Up</a>
        <p className='login-error'>{errorMsg}</p>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default LoginPage;

