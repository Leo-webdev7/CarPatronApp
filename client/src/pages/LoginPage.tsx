// pages/LoginPage.js
import '../App.css'; 
import LoginForm from '../components/LoginForm.js';
import Header from '../components/Header.js';

const LoginPage = () => {
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

