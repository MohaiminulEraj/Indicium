import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Home.css";
import "../../styles/Responsive.css";
import logo from "../../assets/images/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const VerifyEmailPopup = (props) => {
    const [code, setCode] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        
    }

    return (
        <div className="popupBodyWrapper">
            <div className="popupBodyWrapperLayer"></div>
            <div className="container-fluid popupBodyContainerLinear resetPass">
                <div className="popupBodyContainerLayer"></div>

                <div className="popupBodyContainer">

                    <div className="row popupHeaderRow">

                        {/* <div className="col-sm-6">
                            <img src={logo} className="popupLogo" />
                        </div> */}
                        <div className="col-sm-11 signupPopupTitle">
                            Verify Email
                        </div>
                        <div className="col-sm-1 popUpCloseBtn" onClick={() => props.setVerfyEmailPopup(!props.verfyEmailPopup)}>
                            <FontAwesomeIcon icon={faTimes} color="black" />
                        </div>
                    </div>
                    {/* Popup header ends here */}


                    {/* Popup Form Starts here */}
                    <div className="ContentWrapper">
                        <div className="ContentWrapperText1">
                            Enter the 6 digit code we've sent to your email.
                        </div>
                        <div className="formWrapper">

                            <form onSubmit={handleSubmit}>
                                {/* Email Field */}
                                <div className="inputWrapper">
                                    <div className="inputLabel">Verification Code</div>
                                    <div className="row">
                                        <div className="col-sm inputFieldWrapperVerify">
                                            <div className="inputFieldWrapperLayer"></div>
                                            <input value={code} onChange={(e) => setCode(e.target.value)} type="text" className="inputField" required />
                                        </div>
                                        {/* <div className="col-sm inputFieldWrapperVerify">
                                                <div className="inputFieldWrapperLayer"></div>
                                                <input type="text" className="inputField" maxlength={1}  required />
                                            </div>
                                            <div className="col-sm inputFieldWrapperVerify">
                                                <div className="inputFieldWrapperLayer"></div>
                                                <input type="text" className="inputField" maxlength={1} required />
                                            </div>
                                            <div className="col-sm inputFieldWrapperVerify">
                                                <div className="inputFieldWrapperLayer"></div>
                                                <input type="text" className="inputField" maxlength={1} required />
                                            </div>
                                            <div className="col-sm inputFieldWrapperVerify">
                                                <div className="inputFieldWrapperLayer"></div>
                                                <input type="text" className="inputField" maxlength={1} required />
                                            </div>
                                            <div className="col-sm inputFieldWrapperVerify">
                                                <div className="inputFieldWrapperLayer"></div>
                                                <input type="text" className="inputField" maxlength={1} required />
                                            </div> */}

                                    </div>
                                </div>
                                {/* Signin Button */}
                                {/* <Link to="/signup"> */}
                                <button type="submit" className="signInBtnWrapper">
                                    Enter Verification Code
                                </button>
                                {/* </Link> */}
                            </form>
                        </div>
                        {/* Popup Form Ends here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailPopup;
