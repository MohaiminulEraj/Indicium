import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";
import "../styles/Responsive.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SigninPopup from "./components/SigninPopup";
import SignUpPopup from "./components/SignUpPopup";
import ForgotPassPopup from "./components/ForgotPassPopup";



const ResetPass = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [forgotPassPopup, setForgotPassPopup] = useState(true);


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
      {forgotPassPopup &&
        <ForgotPassPopup forgotPassPopup={forgotPassPopup} setForgotPassPopup={setForgotPassPopup} />
      }
      {/* Signin, register and reset popups */}

      {/* Section1 */}
      <Header onSigninClick={() => setShowPopup(!showPopup)} onSignupClick={() => setShowSignupPopup(!showSignupPopup)} />
      <Footer />
    </div>
  );
};

export default ResetPass;
