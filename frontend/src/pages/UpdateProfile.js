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
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../redux/actions/userActions'
import Message from './components/Message'
import Loader from './components/Loader'
import { USER_UPDATE_PROFILE_RESET } from '../redux/constants/userConstants'

const UpdateProfile = (props) => {
    const dispatch = useDispatch()


    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const [showPopup, setShowPopup] = useState(false);
    const [showSignupPopup, setShowSignupPopup] = useState(false);
    const [iagree, setIagree] = useState(false);
    // const [form, setForm] = useState();
    const [name, setName] = useState(user ? user.name : '');
    const [walletPublicAdd, setWalletPublicAdd] = useState(user ? user.walletPublicAdd : '')
    const [location, setLocation] = useState(user ? (user.location !== 'lc' && user.location) : '')
    const [username, setusername] = useState(user ? user.username : '')
    const [bio, setBio] = useState(user ? user.bio : '')
    const [instagram, setInstagram] = useState(user ? user.instagram : '')
    const [twitter, setTwitter] = useState(user ? user.twitter : '')
    const [facebook, setFacebook] = useState(user ? user.facebook : '')
    const [website, setWebsite] = useState(user ? user.website : '')
    const [notify_email, setNotify_email] = useState(user ? user.notify_email : false)
    const [notify_new_bids, setNotify_new_bids] = useState(user ? user.notify_new_bids : false)
    const [notify_item_purchased, setNotify_item_purchased] = useState(user ? user.notify_item_purchased : false)
    const [notify_people_followed, setNotify_people_followed] = useState(user ? user.notify_people_followed : false)
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url);


    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const [message, setMessage] = useState(null)

    // const handleInputChange = (event) => {
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;

    //     setForm({
    //         [name]: value
    //     });
    //     console.log(name)
    // }

    useEffect(() => {
        if (!userInfo) {
            window.location.href = '/'
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails(userInfo._id))
            } else {
                setName(user?.name)
                setWalletPublicAdd(user?.walletPublicAdd === 'w' ? '' : user?.walletPublicAdd)
                setLocation(user?.location === 'lc' ? '' : user?.location)
                setBio(user?.bio === 'b' ? '' : user?.bio)
                setInstagram(user?.instagram)
                setTwitter(user?.twitter)
                setFacebook(user?.facebook)
                setWebsite(user?.website)
                setNotify_email(user?.notify_email)
                setNotify_new_bids(user?.notify_new_bids)
                setNotify_item_purchased(user?.notify_item_purchased)
                setNotify_people_followed(user?.notify_people_followed)
                setAvatarPreview(user?.avatar?.url)
                setAvatar(user?.avatar?.url)
            }
        }
    }, [dispatch, user, userInfo, success])

    const avatarUpdate = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result);
                    setAvatarPreview(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserProfile({ id: userInfo._id, name, avatar, walletPublicAdd, location, bio, instagram, twitter, facebook, website, notify_email, notify_new_bids, notify_item_purchased, notify_people_followed }))
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
            {message && <Message variant='danger'>{message}</Message>}
            { }
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <form onSubmit={handleSubmit} className="signupFormSection row">
                    <div className="col-sm-6 signupFormSectionCol ">
                        {/* Left form column Starts here here */}
                        <div className="signupVR"></div>
                        <div className="row signupFormCol1Row1">
                            <div className="col-sm-6 profileLeftCardImgWrapper2">
                                {/* <img src={profileAvatar} style={{ width: '100%', height: '100%' }} /> */}
                                <img src={avatarPreview} style={{ width: '100%', height: '100%' }} />
                            </div>
                            <div className="col-sm-6 " style={{ marginLeft: 20 }}>
                                <div className="signupFormCol1Row1Text1">Profile photo</div>
                                <div className="signupFormCol1Row1Text2">We recommend an image of at <br />least 400x400. Gifs work too 🙌</div>
                                <div className="uploadSignupBtnWrapper">
                                    <div className="uploadSignupBtn">
                                        <label style={{ cursor: 'pointer' }} htmlFor="uploadPhoto" className="uploadSignupBtnLayer">
                                            Upload
                                        </label>
                                        <input name='avatar' id="uploadPhoto" onChange={avatarUpdate} type="file" className="uploadSignupBtnLayer" accept='images/*' placeholder="Upload" />

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
                                    <input name="name" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Bruno Bangnyfe" className="signupInputField" />
                                </div>
                            </div>

                            {/* UserName Field */}
                            {/* <div className="signupInputWrapper">
                                <div className="signupInputLabel">UserName</div>
                                <div className="signupInputFieldWrapper">
                                    <div className="signupInputFieldWrapperLayer"></div>
                                    <input type="text" value={user?.username} placeholder="Username" className="signupInputField" disabled />
                                </div>
                            </div> */}

                            {/* Email Field */}
                            <div className="signupInputWrapper">
                                <div className="signupInputLabel">Email</div>
                                <div className="signupInputFieldWrapper">
                                    <div className="signupInputFieldWrapperLayer"></div>
                                    <input type="email" value={userInfo?.email} disabled placeholder="Add your email here" className="signupInputField" />
                                </div>
                            </div>
                            {/* { Wallet } */}
                            <div className="signupInputWrapper">
                                <div className="signupInputLabel">Wallet Public Address</div>
                                <div className="signupInputFieldWrapper">
                                    <div className="signupInputFieldWrapperLayer"></div>
                                    <input type="text" value={walletPublicAdd} onChange={(e) => setWalletPublicAdd(e.target.value)} placeholder="Wallet Address" className="signupInputField" />
                                </div>
                            </div>
                            {/* Location Field */}
                            <div className="signupInputWrapper">
                                <div className="signupInputLabel">Location</div>
                                <div className="signupInputFieldWrapper">
                                    <div className="signupInputFieldWrapperLayer"></div>
                                    <input type="text" placeholder="Indianapolis" value={location} onChange={(e) => setLocation(e.target.value)} className="signupInputField" />
                                </div>
                            </div>

                            {/* Bio Field */}
                            <div className="signupInputWrapper">
                                <div className="signupInputLabel">Bio</div>
                                <div className="signupInputFieldWrapper signupTextField">
                                    <div className="signupInputFieldWrapperLayer"></div>
                                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="signupInputField signupTextField"></textarea>
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
                                <input type="text" placeholder="https://www.instagram.com/MrcAlexandre" value={instagram} onChange={(e) => setInstagram(e.target.value)} className="signupInputField" />
                            </div>
                        </div>

                        {/* Twitter Field */}
                        <div className="signupInputWrapper">
                            <div className="signupInputLabel">Twitter</div>
                            <div className="signupInputFieldWrapper">
                                <div className="signupInputFieldWrapperLayer"></div>
                                <input type="text" placeholder="Enter URL" value={twitter} onChange={(e) => setTwitter(e.target.value)} className="signupInputField" />
                            </div>
                        </div>

                        {/* Facebook Field */}
                        <div className="signupInputWrapper">
                            <div className="signupInputLabel">Facebook</div>
                            <div className="signupInputFieldWrapper">
                                <div className="signupInputFieldWrapperLayer"></div>
                                <input type="text" placeholder="Enter URL" value={facebook} onChange={(e) => setFacebook(e.target.value)} className="signupInputField" />
                            </div>
                        </div>

                        {/* Website Field */}
                        <div className="signupInputWrapper">
                            <div className="signupInputLabel">Website</div>
                            <div className="signupInputFieldWrapper">
                                <div className="signupInputFieldWrapperLayer"></div>
                                <input type="text" placeholder="Enter URL" value={website} onChange={(e) => setWebsite(e.target.value)} className="signupInputField" />
                            </div>
                        </div>
                        <div className="fullHr" style={{ marginTop: 30 }}></div>

                        <div className="signupFormCol1Row1Text1">Notifications</div>

                        <div className="switchWrapper">
                            <label class="switch">
                                <input type="checkbox" checked={notify_email} onChange={(e) => setNotify_email(e.target.checked)} />
                                <span class="slider round"></span>
                            </label>
                            <div className="switchText">Email Notifications</div>
                        </div>

                        <div className="switchWrapper">
                            <label class="switch">
                                <input type="checkbox" checked={notify_new_bids} onChange={(e) => setNotify_new_bids(e.target.checked)} />
                                <span class="slider round"></span>
                            </label>
                            <div className="switchText">New Bids</div>
                        </div>


                        <div className="switchWrapper">
                            <label class="switch">
                                <input type="checkbox" checked={notify_item_purchased} onChange={(e) => setNotify_item_purchased(e.target.checked)} />
                                <span class="slider round"></span>
                            </label>
                            <div className="switchText">Item Purchased</div>
                        </div>


                        <div className="switchWrapper">
                            <label class="switch">
                                <input type="checkbox" checked={notify_people_followed} onChange={(e) => setNotify_people_followed(e.target.checked)} />
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
                                <input
                                    className="rememberMeToggleBtn"
                                    onClick={() => setIagree(!iagree)}
                                    type="checkbox"
                                    id="agreement"
                                    required
                                />
                                <label htmlFor="agreement">
                                    I agree Stack terms of service
                                </label>
                                {/* {iagree && <FontAwesomeIcon icon={faCheck} color="white" style={{ fontSize: 10 }} />} */}
                                {/* </div> */}
                                {/* <input onClick={() => setIagree(!iagree)} style={{ backgroundColor: iagree ? "#41B6E6" : 'white' }} className="rememberMeToggleBtn" type="checkbox" /> */}
                            </div>
                        </div>
                        {/* Save Profile Button starts here  */}
                        <button type="submit" className="saveProfileBtn">
                            Save Profile
                        </button>

                    </div>
                    {/* Right form column Ends here  */}
                </form>
            )}
            {/* Form Ends  here */}




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

export default UpdateProfile;
