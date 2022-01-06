import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Home.css";
import "../../styles/Responsive.css";
import logo from "../../assets/images/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTimes } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
// import { login } from "../../redux/actions/userActions"
import Message from "./Message";
// import Loader from "./Loader";
import { resetPassword, clearErrors } from '../../redux/actions/userActions'


const NewPassPopup = (props) => {
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    // const userLogin = useSelector((state) => state.userLogin)
    // const { loading, error, userInfo } = userLogin
    const { error, success } = useSelector(state => state.forgotPassword)


    // const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            window.location.href = '/signin'
        }

    }, [dispatch, success])


    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);
        dispatch(resetPassword(props.match.params.token, formData))
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
                        <div className="col-sm-6 popUpCloseBtn" onClick={() => props.setNewPassPopup(!props.newPassPopup)}>
                            <FontAwesomeIcon icon={faTimes} color="black" />
                        </div>
                    </div>
                    {/* Popup header ends here */}


                    {/* Popup Form Starts here */}
                    <div className="formWrapper">
                        {error && <Message variant='danger'>{error}</Message>}
                        {/* {loading && <Loader />} */}
                        <form onSubmit={submitHandler}>
                            {/* Password Field */}
                            <div className="inputWrapper">
                                <div className="inputLabel">New Password</div>
                                <div className="inputFieldWrapper">
                                    <div className="inputFieldWrapperLayer"></div>
                                    <input autofocus="false" type={showPass ? "text" : "password"} placeholder="********" className="inputField" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    <FontAwesomeIcon onClick={() => setShowPass(!showPass)} icon={faEye} color={showPass ? "white" : "#8FA3AD"} />
                                </div>
                            </div>
                            <div className="inputWrapper">
                                <div className="inputLabel">Confirm New Password</div>
                                <div className="inputFieldWrapper">
                                    <div className="inputFieldWrapperLayer"></div>
                                    <input autofocus="false" type={showPass ? "text" : "password"} placeholder="********" className="inputField" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                    <FontAwesomeIcon onClick={() => setShowPass(!showPass)} icon={faEye} color={showPass ? "white" : "#8FA3AD"} />
                                </div>
                            </div>
                            {/* Signin Button */}
                            {/* <Link to="/profile"> */}
                            <button type="submit" className="signInBtnWrapper">
                                Submit
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

export default NewPassPopup;
