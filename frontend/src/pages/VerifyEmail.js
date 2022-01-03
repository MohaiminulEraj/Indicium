import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";
import "../styles/Responsive.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SigninPopup from "./components/SigninPopup";
import SignUpPopup from "./components/SignUpPopup";
import VerifyEmailPopup from "./components/VerifyEmailPopup";



const VerifyEmail = (props) => {
    const [showPopup, setShowPopup] = useState(false);
    const [showSignupPopup, setShowSignupPopup] = useState(false);
    const [verfyEmailPopup, setVerfyEmailPopup] = useState(true);


    return (
        <div className="body">

            {/* Signin, register and reset popups */}
            {showPopup &&
                <SigninPopup showPopup={showPopup} setShowPopup={setShowPopup} />
            }
            {
                showSignupPopup &&
                <SignUpPopup showSignupPopup={showSignupPopup} setShowSignupPopup={setShowSignupPopup} />

            }
            {verfyEmailPopup &&
                <VerifyEmailPopup verfyEmailPopup={verfyEmailPopup} setVerfyEmailPopup={setVerfyEmailPopup} />
            }
            {/* Signin, register and reset popups */}

            {/* Section1 */}
            <Header onSigninClick={() => setShowPopup(!showPopup)} onSignupClick={() => setShowSignupPopup(!showSignupPopup)} />
            <Footer />
        </div>
    );
};

export default VerifyEmail;
