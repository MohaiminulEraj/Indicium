import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";
import "../styles/Responsive.css";
import Footer from "./components/Footer";
import CustomNavbar from "./components/CustomNavbar";
import editIcon from "../assets/images/editIcon.png";
import galleryIcon from "../assets/images/galleryIcon.png";
import discoverCardThumbnail1 from "../assets/images/discoverCardThumbnail1.png";
import discoverCardThumbnail2 from "../assets/images/discoverCardThumbnail2.png";
import profileAvatar from "../assets/images/profileAvatar.png";
import discoverCardThumbnail4 from "../assets/images/discoverCardThumbnail4.png";
import filledIcon from "../assets/images/Filled.png";
import internetIcon from "../assets/images/internet.png";
import shareSquare from "../assets/images/shareSquare.png";
import twitter from "../assets/images/twitter.png";
import insta from "../assets/images/insta.png";
import fbCircle from "../assets/images/fbCircle.png";


import ProfileDiscoverCard from "./components/ProfileDiscoverCard"
import moreFill from "../assets/images/morefill.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SigninPopup from "./components/SigninPopup";
import SignUpPopup from "./components/SignUpPopup";

const Profile = (props) => {

    const [activeItem, setActiveItem] = useState('onSale')
    const [showPopup, setShowPopup] = useState(false);
    const [showSignupPopup, setShowSignupPopup] = useState(false);

    
    const onMenuItemClick = (id) => {
        console.log(id)
        setActiveItem(id)
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


            <div className="navBarDiscover">
                <CustomNavbar onSigninClick={() => setShowPopup(!showPopup)} onSignupClick={() => setShowSignupPopup(!showSignupPopup)} />
            </div>



            {/* Cover Photo */}
            <div className="profileCoverPhoto">
                <div className="row">
                    <div className="col-sm-7">
                    </div>
                    <div className="profileCoverPhotoBtnsWrapper col-sm-5">
                        <div className="row">
                            <div className="col-sm-4 text-center">
                                <div className="profileCoverPhotoBtn">
                                    <div className="profileCoverPhotoBtnText">Edit cover photo</div>
                                    <img src={galleryIcon} style={{ width: 16, height: 16, marginLeft: 10 }} />
                                </div>
                            </div>
                            <div className="col-sm-4 text-center">
                                <div className="profileCoverPhotoBtn">
                                    <div className="profileCoverPhotoBtnText">Edit profile</div>
                                    <img src={editIcon} style={{ width: 16, height: 16, marginLeft: 10 }} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* Cover Photo */}

            {/* Profile Body */}
            <div className="profileBodySection">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 profileLeftCardWrapperCol text-center">
                            {/* Profile Vertical Card starts here */}
                            <div className="profileLeftCardWrapper">
                                <div className="profileLeftCardImgWrapper">
                                    <img src={profileAvatar} style={{ width: '100%', height: '100%' }} />
                                </div>
                                <div className="profileLeftCardUsernameText">Enrico Coles</div>
                                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                    <div className="profileLeftCardUsernameText2">0xc4c16a645...b21a</div>
                                    <img src={filledIcon} style={{ width: 16, height: 16, marginLeft: 10 }} />
                                </div>
                                <div className="profileLeftCardUsernameText3">
                                    A wholesome farm owner in
                                    <br />Montana. Upcoming gallery solo
                                    <br /> show in Germany
                                </div>
                                <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 20 }}>
                                    <img src={internetIcon} style={{
                                        marginRight: 5,
                                        width: 16,
                                        height: 16,
                                        marginLeft: 10,
                                        position: 'relative',
                                        top: 3

                                    }} />
                                    <div className="profileLeftCardUsernameText2">website.com</div>
                                </div>

                                <div className="row profileActionButton" style={{ marginTop: 30 }}>
                                    <div className="col-sm-6">
                                        <div className="profileFollowBtn">Follow</div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="profileFollowBtn2">
                                            <img src={shareSquare} style={{ width: '50%', height: '50%' }} />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="profileFollowBtn2">
                                            <img src={moreFill} style={{ width: '50%', height: '50%' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row socialActionButton" style={{ marginTop: 30 }}>
                                    <div className="col-sm-4">
                                        <img src={twitter} style={{ width: 25, height: 25, marginLeft: 10, marginRight: 10 }} />
                                    </div>
                                    <div className="col-sm-4">
                                        <img src={insta} style={{ width: 25, height: 25, marginRight: 10, marginLeft: 10 }} />
                                    </div>
                                    <div className="col-sm-4">
                                        <img src={fbCircle} style={{ width: 25, height: 25, marginRight: 10, marginLeft: 10 }} />
                                    </div>
                                </div>

                                <div className="profileHrDivider"></div>
                                <div className="profileLeftCardUsernameTextBottomLine">Member since Mar 15, 2021</div>
                            </div>
                            {/* Profile Vertical Card starts here */}\
                        </div>
                        <div className="col-sm-8">
                            {/* Menu Items Starts here */}
                            <div className="row" style={{ marginTop: 30 }}>
                                <div className="col-sm-8">
                                    <div className="row">
                                        <div className="col-sm-2 profileRightMenuItemCol">
                                            <div className={
                                                activeItem == "onSale"
                                                    ?
                                                    "profileRightMenuItemActive"
                                                    :
                                                    "profileRightMenuItemNonActive"}
                                                onClick={() => onMenuItemClick("onSale")}>
                                                on Sale
                                            </div>
                                        </div>
                                        <div className="col-sm-2 profileRightMenuItemCol" onClick={() => onMenuItemClick("Collectibles")}>
                                            <div className={
                                                activeItem == "Collectibles"
                                                    ?
                                                    "profileRightMenuItemActive"
                                                    :
                                                    "profileRightMenuItemNonActive"}>
                                                Collectibles
                                            </div>
                                        </div>
                                        <div className="col-sm-2 profileRightMenuItemCol" onClick={() => onMenuItemClick("Created")}>
                                            <div className={
                                                activeItem == "Created"
                                                    ?
                                                    "profileRightMenuItemActive"
                                                    :
                                                    "profileRightMenuItemNonActive"}>
                                                Created
                                            </div>
                                        </div>
                                        <div className="col-sm-2 profileRightMenuItemCol" onClick={() => onMenuItemClick("Likes")}>
                                            <div className={
                                                activeItem == "Likes"
                                                    ?
                                                    "profileRightMenuItemActive"
                                                    :
                                                    "profileRightMenuItemNonActive"}>
                                                Likes
                                            </div>
                                        </div>
                                        <div className="col-sm-2 profileRightMenuItemCol" onClick={() => onMenuItemClick("Following")}>
                                            <div className={
                                                activeItem == "Following"
                                                    ?
                                                    "profileRightMenuItemActive"
                                                    :
                                                    "profileRightMenuItemNonActive"}>
                                                Following
                                            </div>
                                        </div>
                                        <div className="col-sm-2 profileRightMenuItemCol" onClick={() => onMenuItemClick("Followers")}>
                                            <div className={
                                                activeItem == "Followers"
                                                    ?
                                                    "profileRightMenuItemActive"
                                                    :
                                                    "profileRightMenuItemNonActive"}>
                                                Followers
                                            </div>
                                        </div>Î
                                    </div>
                                </div>
                            </div>
                            {/* Menu Items ends here */}

                            {/* Cards Starts  here */}
                            <div className="row discoverCardWrapper">
                                <ProfileDiscoverCard thumbnail={discoverCardThumbnail1} />
                                <ProfileDiscoverCard thumbnail={discoverCardThumbnail2} />
                                <ProfileDiscoverCard thumbnail={discoverCardThumbnail4} />
                            </div>
                            {/* Cards Ends  here */}

                        </div>
                    </div>
                </div>
                {/* Container */}
            </div>
            {/* Profile Body */}

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Profile;
