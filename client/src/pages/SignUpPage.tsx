// pages/SignupPage.js
import '../App.css'; 
import SignupForm from '../components/SignupForm.js';
import Header from '../components/Header';

const SignupPage = () => {
  return (
  <>
    <div className="signup-page">
      <Header />
      <SignupForm/>
    </div>
  </> 
  );
};

export default SignupPage;
