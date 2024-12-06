import '../App.css';
import Header from '../components/Header';
// import Footer from "../components/Footer";
//import Nav2 from "../components/Nav2"
// import Nav from "../components/Nav"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
// import Nav from "../components/Nav";



function HomePage () {
    const [loginCheck, setLoginCheck] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = () => {
            if (Auth.loggedIn()) {
                setLoginCheck(true);  // User is logged in
            } else {
                // If not logged in, log out and redirect
                Auth.logout();
                alert(`Not Logged In/Session Expired!\nPlease Log In`);
                navigate('/');  // Redirect to login page
            }
        };
        checkLogin();
    }, [navigate]);

    if (!loginCheck) {
        return null;  // Render nothing until login check is done
    }

    return (
        <div className="welcome-wrap">
            <Header />
            {/* <Nav2 /> */}
            <h1>
                Welcome to Amygdala!
            </h1>
            <h2>
                We are happy you are here!
            </h2>
            {/* <Nav />
            <Footer /> */}
        </div>
    )
}

export default HomePage;