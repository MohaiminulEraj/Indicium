import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";
import "../styles/Responsive.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SigninPopup from "./components/SigninPopup";
import SignUpPopup from "./components/SignUpPopup";



const Signin = (props) => {
    const [showPopup, setShowPopup] = useState(true);
    const [showSignupPopup, setShowSignupPopup] = useState(false);

    return (
        <div className="body">

            {/* Signup and register popups */}
            {showPopup &&
                <SigninPopup showPopup={showPopup} setShowPopup={setShowPopup} />
            }
            {
                showSignupPopup &&
                <SignUpPopup showSignupPopup={showSignupPopup} setShowSignupPopup={setShowSignupPopup} />

            }
            {/* Signup and register popups */}

            {/* Section1 */}
            <Header onSigninClick={() => setShowPopup(!showPopup)} onSignupClick={() => setShowSignupPopup(!showSignupPopup)} />
            <Footer />
        </div>
    );
};

export default Signin;
