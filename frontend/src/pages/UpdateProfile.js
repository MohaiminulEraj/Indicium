import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";
import "../styles/Responsive.css";
import Footer from "./components/Footer";
import CustomNavbar from "./components/CustomNavbar";
import SigninPopup from "./components/SigninPopup";
import SignUpPopup from "./components/SignUpPopup";
import profileAvatar from "../assets/images/profileAvatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const SignUp = (props) => {
    const [showPopup, setShowPopup] = useState(false);
    const [showSignupPopup, setShowSignupPopup] = useState(false);
    const [iagree, setIagree] = useState(false);
    const [form, setForm] = useState();

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setForm({
            [name]: value
        });
        console.log(name)
    }




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

            <div className="navBarDiscoverSignup">
                <CustomNavbar onSigninClick={() => setShowPopup(!showPopup)} onSignupClick={() => setShowSignupPopup(!showSignupPopup)} />
                <div className="signupTitle">
                    REGISTER NEW ACCOUNT
                </div>
                <div className="signupTagline">
                    You can set preferred display name, create your profile URL and manage other personal settings.
                </div>
            </div>
            <div className="fullHr"></div>
            {/* Navbar ends here */}

            {/* Form Starts here here */}
            <div className="signupFormSection row">
                <div className="col-sm-6 signupFormSectionCol ">
                    {/* Left form column Starts here here */}
                    <div className="signupVR"></div>
                    <div className="row signupFormCol1Row1">
                        <div className="col-sm-6 profileLeftCardImgWrapper2">
                            <img src={profileAvatar} style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div className="col-sm-6 " style={{ marginLeft: 20 }}>
                            <div className="signupFormCol1Row1Text1">Profile photo</div>
                            <div className="signupFormCol1Row1Text2">We recommend an image of at <br />least 400x400. Gifs work too 🙌</div>
                            <div className="uploadSignupBtnWrapper">
                                <div className="uploadSignupBtn">
                                    <div className="uploadSignupBtnLayer">Upload</div>
                                </div>
                            </div>
                        </div>
                        <div className="fullHr" style={{ marginTop: 30 }}></div>
                        <div className="signupFormCol1Row1Text1">My Account</div>

                        {/* Form starts here */}
                        {/* Name Field */}
                        <div className="signupInputWrapper">
                            <div className="signupInputLabel">Name</div>
                            <div className="signupInputFieldWrapper">
                                <div className="signupInputFieldWrapperLayer"></div>
                                <input name="name" onChange={handleInputChange} type="text" placeholder="Bruno Bangnyfe" className="signupInputField" />
                            </div>
                        </div>

                        {/* UserName Field */}
                        <div className="signupInputWrapper">
                            <div className="signupInputLabel">UserName</div>
                            <div className="signupInputFieldWrapper">
                                <div className="signupInputFieldWrapperLayer"></div>
                                <input type="text" placeholder="Bruno12" className="signupInputField" />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="signupInputWrapper">
                            <div className="signupInputLabel">Email</div>
                            <div className="signupInputFieldWrapper">
                                <div className="signupInputFieldWrapperLayer"></div>
                                <input type="email" placeholder="Add your email here" className="signupInputField" />
                            </div>
                        </div>

                        {/* Location Field */}
                        <div className="signupInputWrapper">
                            <div className="signupInputLabel">Location</div>
                            <div className="signupInputFieldWrapper">
                                <div className="signupInputFieldWrapperLayer"></div>
                                <input type="text" placeholder="Indianapolis" className="signupInputField" />
                            </div>
                        </div>

                        {/* Bio Field */}
                        <div className="signupInputWrapper">
                            <div className="signupInputLabel">Bio</div>
                            <div className="signupInputFieldWrapper signupTextField">
                                <div className="signupInputFieldWrapperLayer"></div>
                                <textarea className="signupInputField signupTextField"></textarea>
                            </div>
                        </div>




                        {/* Form starts here */}
                    </div>
                </div>
                {/* Left form column Ends here here */}
                <div className="col-sm-6 signupFormSectionCol" style={{ paddingLeft: 30 }}>
                    <div className="signupFormCol1Row1Text1">Social Account</div>

                    {/* Instagram Field */}
                    <div className="signupInputWrapper">
                        <div className="signupInputLabel">Instagram</div>
                        <div className="signupInputFieldWrapper">
                            <div className="signupInputFieldWrapperLayer"></div>
                            <input type="text" placeholder="https://www.instagram.com/MrcAlexandre" className="signupInputField" />
                        </div>
                    </div>

                    {/* Twitter Field */}
                    <div className="signupInputWrapper">
                        <div className="signupInputLabel">Twitter</div>
                        <div className="signupInputFieldWrapper">
                            <div className="signupInputFieldWrapperLayer"></div>
                            <input type="text" placeholder="Enter URL" className="signupInputField" />
                        </div>
                    </div>

                    {/* Facebook Field */}
                    <div className="signupInputWrapper">
                        <div className="signupInputLabel">Facebook</div>
                        <div className="signupInputFieldWrapper">
                            <div className="signupInputFieldWrapperLayer"></div>
                            <input type="text" placeholder="Enter URL" className="signupInputField" />
                        </div>
                    </div>

                    {/* Website Field */}
                    <div className="signupInputWrapper">
                        <div className="signupInputLabel">Website</div>
                        <div className="signupInputFieldWrapper">
                            <div className="signupInputFieldWrapperLayer"></div>
                            <input type="text" placeholder="Enter URL" className="signupInputField" />
                        </div>
                    </div>
                    <div className="fullHr" style={{ marginTop: 30 }}></div>

                    <div className="signupFormCol1Row1Text1">Notifications</div>

                    <div className="switchWrapper">
                        <label class="switch">
                            <input type="checkbox" />
                            <span class="slider round"></span>
                        </label>
                        <div className="switchText">Email Notifications</div>
                    </div>

                    <div className="switchWrapper">
                        <label class="switch">
                            <input type="checkbox" />
                            <span class="slider round"></span>
                        </label>
                        <div className="switchText">New Bids</div>
                    </div>


                    <div className="switchWrapper">
                        <label class="switch">
                            <input type="checkbox" />
                            <span class="slider round"></span>
                        </label>
                        <div className="switchText">Item Purchased</div>
                    </div>


                    <div className="switchWrapper">
                        <label class="switch">
                            <input type="checkbox" />
                            <span class="slider round"></span>
                        </label>
                        <div className="switchText">People Followed</div>
                    </div>
                    <div className="fullHr" style={{ marginTop: 30 }}></div>
                    <div className="termsText">
                        Please take a few minutes to read and understand Stacks Terms of Service.
                        <br />
                        To continue, you’ll need to accept the terms of services by checking the boxes.
                    </div>
                    <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-sm-12 rememberMeText" style={{ fontSize: 12 }}>
                            <div
                                className="rememberMeToggleBtn"
                                onClick={() => setIagree(!iagree)}
                                style={{ backgroundColor: iagree ? "#41B6E6" : 'white' }}
                            >
                                {iagree && <FontAwesomeIcon icon={faCheck} color="white" style={{ fontSize: 10 }} />}
                            </div>
                            I agree Stack terms of service
                        </div>
                    </div>
                    {/* Save Profile Button starts here  */}
                    <div className="saveProfileBtn">
                        Save Profile
                    </div>

                </div>
                {/* Right form column Ends here  */}
            </div>
            {/* Form Starts  here */}




            {/* Footer */}
            <div style={{
                paddingTop: 80, minHeight: 400,
                backgroundColor: '#020407',
                position: 'relative'
            }}>
                <Footer />
            </div>
        </div>
    );
};

export default SignUp;
