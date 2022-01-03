import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Home.css";
import "../../styles/Responsive.css";
import logo from "../../assets/images/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../../redux/actions/userActions"
import Message from "./Message";
import Loader from "./Loader";

const SigninPopup = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    // const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

    useEffect(() => {

        if (userInfo) {
            window.location.href = '/'
        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password, rememberMe))
    }


    return (
        <div className="popupBodyWrapper">
            <div className="popupBodyWrapperLayer"></div>
            <div className="container-fluid popupBodyContainerLinear">
                <div className="popupBodyContainerLayer"></div>

                <div className="popupBodyContainer">

                    <div className="row popupHeaderRow">
                        <div className="col-sm-6">
                            <img src={logo} className="popupLogo" />
                        </div>
                        <div className="col-sm-6 popUpCloseBtn" onClick={() => props.setShowPopup(!props.showPopup)}>
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
                                    <input type="email" placeholder="your@email.com" className="inputField" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                            </div>
                            {/* Password Field */}
                            <div className="inputWrapper">
                                <div className="inputLabel">Password</div>
                                <div className="inputFieldWrapper">
                                    <div className="inputFieldWrapperLayer"></div>
                                    <input autofocus="false" type={showPass ? "text" : "password"} placeholder="********" className="inputField" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    <FontAwesomeIcon onClick={() => setShowPass(!showPass)} icon={faEye} color={showPass ? "white" : "#8FA3AD"} />
                                </div>
                            </div>
                            {/* Remember me and Forget Password */}
                            <div className="row">
                                <div className="col-sm-6 rememberMeText">
                                    <div className="rememberMeToggleBtn" onClick={() => setRememberMe(!rememberMe)}>
                                        {rememberMe && <FontAwesomeIcon icon={faCheck} color="black" style={{ fontSize: 11 }} />}
                                    </div>
                                    Remember me
                                </div>
                                <div className="col-sm-6 forgetPassText">
                                    <Link to="/forgot-password">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>

                            {/* Signin Button */}
                            {/* <Link to="/profile"> */}
                            <button type="submit" className="signInBtnWrapper">
                                Sign in
                            </button>
                            {/* </Link> */}
                        </form>
                    </div>
                    {/* Popup Form Ends here */}
                </div>
            </div>
        </div>
    );
};

export default SigninPopup;
