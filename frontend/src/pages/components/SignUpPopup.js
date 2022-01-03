import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Home.css";
import "../../styles/Responsive.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { register } from "../../redux/actions/userActions"
import { setAlert } from "../../redux/actions/alert"
import Message from "./Message";
import Loader from "./Loader";


const SignUpPopup = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            window.location.href = '/verify-email'
        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(register(email, password, rememberMe))

        // if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(password)) {
        //     dispatch(register(email, password, rememberMe))
        // } else {
        //     setAlert('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character', 'danger');
        // }
    }


    return (
        <div className="popupBodyWrapper">
            <div className="popupBodyWrapperLayer"></div>
            <div className="container-fluid popupBodyContainerLinear2">
                <div className="popupBodyContainerLayer"></div>

                <div className="popupBodyContainer">

                    <div className="row popupHeaderRow">
                        <div className="col-sm-11 signupPopupTitle">
                            Join to the Indicium
                        </div>
                        <div className="col-sm-1 popUpCloseBtn" onClick={() => props.setShowSignupPopup(!props.showSignupPopup)}>
                            <FontAwesomeIcon icon={faTimes} color="black" />
                        </div>
                    </div>
                    {/* Popup header ends here */}

                    {/* Popup Content Starts here */}
                    <div className="ContentWrapper">
                        <div className="ContentWrapperText1">
                            We have noticed you don’t have a Neftly account yet
                        </div>
                        {error && <Message variant='danger'>{error}</Message>}
                        {loading && <Loader />}
                        <form onSubmit={submitHandler}>
                            {/* Email Field */}
                            <div className="inputWrapper">
                                <div className="inputLabel">Email address</div>
                                <div className="inputFieldWrapper">
                                    <div className="inputFieldWrapperLayer"></div>
                                    <input type="email" placeholder="your@email.com" className="inputField" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                            </div>
                            {/* Password Field */}
                            <div className="inputWrapper">
                                <div className="inputLabel">Password</div>
                                <div className="inputFieldWrapper">
                                    <div className="inputFieldWrapperLayer"></div>
                                    <input autofocus="false" type={showPass ? "text" : "password"} placeholder="********" className="inputField" value={password} onChange={(e) => setPassword(e.target.value)} required
                                        oninvalid="this.setCustomValidity('Enter User Name Here')"
                                        oninput="this.setCustomValidity('')"
                                    />
                                    <FontAwesomeIcon onClick={() => setShowPass(!showPass)} icon={faEye} color={showPass ? "white" : "#8FA3AD"} />
                                </div>
                                <small style={{ color: "white" }}>Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character, and at least 8 or more characters</small>
                            </div>

                            {/* Remember me and Forget Password */}
                            <div className="row">
                                <div className="col-sm-6 rememberMeText">
                                    <div type="checkbox" className="rememberMeToggleBtn" onClick={() => setRememberMe(!rememberMe)}>
                                        {rememberMe && <FontAwesomeIcon icon={faCheck} color="black" style={{ fontSize: 11 }} />}
                                    </div>
                                    Remember me
                                </div>

                                <div className="col-sm-6 forgetPassText">
                                    <Link to="/signin">
                                        Already have an account?
                                    </Link>
                                </div>
                            </div>
                            <button type="submit" className="signInBtnWrapper">
                                Register My Account
                            </button>

                        </form>
                        <div className="ContentWrapperText2">
                            Bring your profile to the crowd and start receiving notification
                            <br />
                            about your activities and NFT updates
                        </div>
                    </div>
                    {/* Popup Content Ends here */}
                </div>
            </div>
        </div>
    );
};

export default SignUpPopup;
