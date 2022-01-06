import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Home.css";
import "../../styles/Responsive.css";
// import logo from "../../assets/images/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux'
// import { Link } from "react-router-dom";
import { forgotPassword, clearErrors } from "../../redux/actions/userActions"
import Message from "./Message";
import Loader from "./Loader";

const ForgotPassPopup = (props) => {
    const [email, setEmail] = useState('')


    const dispatch = useDispatch()
    const { error, loading, message } = useSelector(state => state.forgotPassword)

    // useEffect(() => {

    //     if (error) {
    //         dispatch(clearErrors());
    //     }

    // }, [dispatch, error])

    const submitHandler = (e) => {
        e.preventDefault()
        // const formData = new FormData();
        // formData.set('email', email);

        dispatch(forgotPassword(email))
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
                            Reset Password
                        </div>
                        <div className="col-sm-1 popUpCloseBtn" onClick={() => props.setForgotPassPopup(!props.forgotPassPopup)}>
                            <FontAwesomeIcon icon={faTimes} color="black" />
                        </div>
                    </div>
                    {/* Popup header ends here */}


                    {/* Popup Form Starts here */}
                    <div className="formWrapper">
                        {error && <Message variant='danger'>{error}</Message>}
                        {loading && <Loader />}
                        <form onSubmit={submitHandler}>
                            {/* Email Field */}
                            <div className="inputWrapper">
                                <div className="inputLabel">Email address</div>
                                <div className="inputFieldWrapper">
                                    <div className="inputFieldWrapperLayer"></div>
                                    <input type="email" placeholder="your@email.com" className="inputField" value={email}
                                        onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                            </div>
                            {/* Signin Button */}
                            <button type="submit" className="signInBtnWrapper">
                                Reset Password
                            </button>
                        </form>
                    </div>
                    {/* Popup Form Ends here */}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassPopup;
