// pages/SignupPage.js
import { useState } from 'react';
// import logo from '../assets/logo/amygdala_logo-crop.jpg';
import '../App.css'; 
// import Footer from '../components/Footer';
// import { createUser } from '../api/userAPI';

const SignupPage = () => {
  const [signUpData, setSignUpData] = useState({
    username: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState(''); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value
    });
    setErrorMsg(''); 
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await createUser(signUpData);
      alert('SignUp successful!');
      window.location.assign('/');
    }
    catch (error){
      console.error('Failed to signup: ', error);
      setErrorMsg('Failed to signup. Please try again later.');
    }
  };

  return (
  <>
    <div className="signup-page">
      <header>
        <a href="/"><img src={logo}  alt="Amygdala - Healing Starts Here" className="logo" /></a>
        <h1>Welcome!!</h1>
      </header>
      <form onSubmit={handleSignup} className="signup-wrap">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder='username'
            name='username'
            value={signUpData.username}
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
            value={signUpData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className='button-container'>
        <button type="submit">Signup</button>
        </div>
      </form>
    </div>
    <Footer />
  </> 
  );
};

export default SignupPage;
