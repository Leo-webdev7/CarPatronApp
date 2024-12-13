// pages/SignupPage.js
import '../App.css'; 
import SignUpForm from '../components/SignUpForm.js';
import Header from '../../../Header.js';

const SignUpPage = () => {
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
