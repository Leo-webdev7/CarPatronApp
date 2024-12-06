// pages/LoginPage.js
import '../App.css'; 
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';

const LoginPage = () => {
  return (
    <>
    <div className="login-page">
      <Header />
      <LoginForm />
    </div>
    </>
  );
};

export default LoginPage;

