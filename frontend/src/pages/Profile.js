import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
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
// import coverPic from "../assets/images/cover.png";
import twitter from "../assets/images/twitter.png";
import insta from "../assets/images/insta.png";
import fbCircle from "../assets/images/fbCircle.png";
import { Link } from "react-router-dom";
import { FaCheck, FaTimes } from 'react-icons/fa'
import { getUserDetails, updateCoverPhoto } from '../redux/actions/userActions'
import { getNfts } from "../redux/actions/nftActions"
import ProfileDiscoverCard from "./components/ProfileDiscoverCard"
import Message from './components/Message'
import Loader from './components/Loader'
import axios from 'axios'
// import moreFill from "../assets/images/morefill.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import SigninPopup from "./components/SigninPopup";
// import SignUpPopup from "./components/SignUpPopup";

const Profile = (props) => {

    const [activeItem, setActiveItem] = useState('onSale')
    const [showPopup, setShowPopup] = useState(false);
    const [showSignupPopup, setShowSignupPopup] = useState(false);
    const [message, setMessage] = useState(null)
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, user } = userDetails

    const [coverPhoto, setCoverPhoto] = useState('');
    const [coverPhotoPreview, setCoverPhotoPreview] = useState('');

    const coverPhotoUpdate = useSelector((state) => state.coverPhotoUpdate)
    const { success } = coverPhotoUpdate

    const ownedNft = useSelector((state) => state.getNft)
    const [nftMetadata, setNftMetadata] = useState({})

    const { nft, error } = ownedNft;
    console.log(nft)

    const dispatch = useDispatch();


    let createdAt = new Date(user?.createdAt || '2022-01-04T11:14:09.314Z');
    createdAt = createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    });
    // console.log(user?.coverPhoto?.url)
    useEffect(() => {
        if (!userInfo) {
            window.location.href = '/'
        } else {
            if (!user || !user.name || success) {
                // dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails(userInfo._id))
            } else {
                setCoverPhoto(user?.coverPhoto?.url)
                // setAvatar(user?.avatar?.url)
            }
        }
    }, [dispatch, user, userInfo])

    useEffect(() => {
        if (!nft) {
            dispatch(getNfts(userInfo._id));
        }
        // if (nftMetadata) {
        //     axios.get(`${nft[0].ipfsDataLink}`)
        //         .then(res => {
        //             console.log(res.data)
        //             setNftMetadata(res.data)
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        // }
    }, [dispatch, nft])

    const onMenuItemClick = (id) => {
        console.log(id)
        setActiveItem(id)
    }
    const coverPhotoUpdateBtn = (e) => {
        if (e.target.name === 'coverPhoto') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setCoverPhoto(reader.result);
                    setCoverPhotoPreview(reader.result);
                }
            }
            if (e.target.files[0]) reader.readAsDataURL(e.target.files[0])
        }
    }

    const submitCoverPhoto = (e) => {
        e.preventDefault();
        dispatch(updateCoverPhoto({ id: userInfo._id, coverPhoto }))
        console.log('submit btn clicked')
        // window.location.href = '/profile'
    }

    return (
        <div style={{ backgroundColor: 'black' }} className="body">

            {/* Signup and register popups */}
            {/* {showPopup &&
                <SigninPopup showPopup={showPopup} setShowPopup={setShowPopup} />
            }
            {
                showSignupPopup &&
                <SignUpPopup showSignupPopup={showSignupPopup} setShowSignupPopup={setShowSignupPopup} />

            } */}
            {/* Signup and register popups */}


            <div className="navBarDiscover">
                <CustomNavbar onSigninClick={() => setShowPopup(!showPopup)} onSignupClick={() => setShowSignupPopup(!showSignupPopup)} />
            </div>



            {/* Cover Photo */}
            {/* <div style={{ backgroundImage: user?.coverPhoto?.url !== '' ? `url(${user?.coverPhoto?.url}` : '' }} className="profileCoverPhoto"> */}
            {loading && <Loader />}
            {message && <Message variant='danger'>{message}</Message>}
            {success && <Message variant='success'>
                Profile Updated
                {window.location.href = '/profile'}
            </Message>}
            {error && <Message variant='danger'>{error}</Message>}
            <div style={{ backgroundImage: coverPhoto !== '' ? `url(${coverPhoto}` : `` }} className="profileCoverPhoto">
                <div className="row">
                    <div className="col-sm-7">
                    </div>
                    <div className="profileCoverPhotoBtnsWrapper col-sm-5">
                        <div className="row">
                            <div className="col-sm-4 text-center">
                                <div className="profileCoverPhotoBtn">
                                    <input name='coverPhoto' id="uploadPhoto" onChange={coverPhotoUpdateBtn} type="file" className="uploadSignupBtnLayer" accept='images/*' />
                                    <label className="profileCoverPhotoBtnText" style={{ cursor: 'pointer' }} htmlFor="uploadPhoto">
                                        Edit cover photo
                                        <img src={galleryIcon} style={{ width: 16, height: 16, marginLeft: 10 }} />
                                    </label>
                                </div>
                            </div>
                            {coverPhotoPreview !== '' ? (
                                <>
                                    <div className="col-sm-4 text-center">
                                        {/* <input name='coverPhoto' id="uploadCoverPhoto" type="submit" className="uploadSignupBtnLayer" accept='images/*' /> */}
                                        <div onClick={submitCoverPhoto} className="profileCoverPhotoBtn">
                                            <label style={{ color: 'green', cursor: 'pointer' }} className="profileCoverPhotoBtnText" htmlFor="uploadCoverPhoto">
                                                Submit  <FaCheck />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 text-center">
                                        <a href="/profile">
                                            <label className="profileCoverPhotoBtn">
                                                <div style={{ color: 'red' }} className="profileCoverPhotoBtnText">Cancel  <FaTimes /></div>
                                            </label>
                                        </a>
                                    </div>
                                </>
                            ) : (
                                <div className="col-sm-4 text-center">
                                    <Link to="/update-profile">
                                        <div className="profileCoverPhotoBtn">
                                            <div className="profileCoverPhotoBtnText">Edit profile</div>
                                            <img src={editIcon} style={{ width: 16, height: 16, marginLeft: 10 }} />
                                        </div>
                                    </Link>
                                </div>
                            )}
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
                                    <img src={user?.avatar?.url || profileAvatar} style={{ width: '100%', height: '100%' }} />
                                </div>
                                <div className="profileLeftCardUsernameText">{user?.name}</div>
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
                                    <div className="profileLeftCardUsernameText2">{user?.website || 'website.com'}</div>
                                </div>

                                {/* <div className="row profileActionButton" style={{ marginTop: 30 }}>
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
                                </div> */}
                                <div className="row socialActionButton" style={{ marginTop: 30 }}>
                                    <div className="col-sm-4">
                                        <a to={user?.twitter} target="_blank" rel="noreferrer noopener">
                                            <img src={twitter} style={{ width: 25, height: 25, marginLeft: 10, marginRight: 10 }} />
                                        </a>
                                    </div>
                                    <div className="col-sm-4">
                                        <a to={user?.instagram} target="_blank" rel="noreferrer noopener">
                                            <img src={insta} style={{ width: 25, height: 25, marginRight: 10, marginLeft: 10 }} />
                                        </a>
                                    </div>
                                    <div className="col-sm-4">
                                        <a href={user?.facebook} target="_blank" rel="noreferrer noopener">
                                            <img src={fbCircle} style={{ width: 25, height: 25, marginRight: 10, marginLeft: 10 }} />
                                        </a>
                                    </div>
                                </div>

                                <div className="profileHrDivider"></div>
                                <div className="profileLeftCardUsernameTextBottomLine">Member since {createdAt} </div>
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
                                {
                                    nft?.length === 0 ?
                                        <div className="alert alert-danger mt-5 w-100"><b>You don't have any NFT Asset!</b></div>
                                        :
                                        nft?.map((myNft, index) => (
                                            <ProfileDiscoverCard key={index} len={nft?.length} ipfsDataLink={myNft?.ipfsDataLink} thumbnail={discoverCardThumbnail1} />
                                        ))
                                }

                                {/* <ProfileDiscoverCard thumbnail={discoverCardThumbnail1} /> */}
                                {/* <ProfileDiscoverCard thumbnail={discoverCardThumbnail2} />
                                <ProfileDiscoverCard thumbnail={discoverCardThumbnail4} />
                                <ProfileDiscoverCard thumbnail={discoverCardThumbnail1} /> */}
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
