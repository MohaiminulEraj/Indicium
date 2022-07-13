import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Home.css";
import "../../styles/Responsive.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomNavbar from "../components/CustomNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSpinner } from "@fortawesome/free-solid-svg-icons";
import DiscoverCard from "../components/DiscoverCard";
import discoverCardThumbnail1 from "../../assets/images/discoverCardThumbnail1.png";
import discoverCardThumbnail2 from "../../assets/images/discoverCardThumbnail2.png";
import discoverCardThumbnail3 from "../../assets/images/discoverCardThumbnail3.png";
import discoverCardThumbnail4 from "../../assets/images/discoverCardThumbnail4.png";
import blackImg from "../../assets/images/blackImg.png";
import SigninPopup from "../components/SigninPopup";
import SignUpPopup from "../components/SignUpPopup";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../../redux/actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

// import { useWeb3 } from '@providers/web3';

const CreateNFT = (props) => {
    // const { ethereum, contract } = useWeb3();
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const [showPopup, setShowPopup] = useState(false);
    const [showSignupPopup, setShowSignupPopup] = useState(false);
    const [message, setMessage] = useState(null)
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(blackImg);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);


    useEffect(() => {
        if (!userInfo) {
            window.location.href = '/'
        } else if (!user || !user.name) {
            dispatch(getUserDetails(userInfo._id))
        }
    }, [dispatch, user, userInfo])

    // const getSignedData = async () => {
    //     const messageToSign = await axios.get("/api/verify");
    //     const accounts = await ethereum?.request({ method: "eth_requestAccounts" });
    //     const account = accounts[0];

    //     const signedData = await ethereum?.request({
    //         method: "personal_sign",
    //         params: [JSON.stringify(messageToSign.data), account, messageToSign.data.id]
    //     })

    //     return { signedData, account };
    // }

    const handleImage = async (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            console.error("Select a file");
            return;
        }

        const file = e.target.files[0];
        const buffer = await file.arrayBuffer();
        const bytes = new Uint8Array(buffer);

        try {
            // const { signedData, account } = await getSignedData();
            // const promise = axios.post("/api/verify-image", {
            //     address: account,
            //     signature: signedData,
            //     bytes,
            //     contentType: file.type,
            //     fileName: file.name.replace(/\.[^/.]+$/, "")
            // });

            // const res = await toast.promise(
            //     promise, {
            //     pending: "Uploading image",
            //     success: "Image uploaded",
            //     error: "Image upload error"
            // }
            // )

            // const data = res?.data;

            // setNftMeta({
            //     ...nftMeta,
            //     // image: `${process.env.NEXT_PUBLIC_PINATA_DOMAIN}/ipfs/${data.IpfsHash}`
            // });
        } catch (e) {
            console.error(e.message);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const avatarUpdate = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result);
                    setAvatarPreview(reader.result);
                }
            }
            if (e.target.files[0]) reader.readAsDataURL(e.target.files[0])
        }
    }

    return (
        <div className="body upr">

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
                    Create NFT Asset
                </div>
                <div className="signupTagline">
                    You can set List your NFT Asset here.
                </div>
            </div>
            <div className="fullHr"></div>
            {/* Navbar ends here */}

            {/* Form Starts here here */}
            {message && <Message variant='danger'>{message}</Message>}
            {/* {success && <Message variant='success'>Profile Updated</Message>} */}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <form onSubmit={handleSubmit} className="signupFormSection row">
                <div className="col-sm-6 signupFormSectionCol ">
                    {/* Left form column Starts here here */}
                    <div className="signupVR"></div>
                    <div className="row signupFormCol1Row1">

                        <div className="signupFormCol1Row1Text1">Create NFT Metadata</div>

                        {/* Form starts here */}
                        {/* Name Field */}
                        <div className="signupInputWrapper">
                            <div className="signupInputLabel">This information will be displayed publicly so be careful what you share.</div>
                        </div>

                        {/* Form starts here */}
                    </div>
                </div>
                {/* Left form column Ends here here */}
                <div className="col-sm-6 signupFormSectionCol" style={{ paddingLeft: 30 }}>
                    {/* Left form column Starts here here */}
                    {/* <div className="signupVR"></div> */}
                    {/* <div className="signupFormCol1Row1Text1">Social Account</div> */}

                    {/* Name Field */}
                    <div className="signupInputWrapper">
                        <div className="signupInputLabel">Asset Name</div>
                        <div className="signupInputFieldWrapper">
                            <div className="signupInputFieldWrapperLayer"></div>
                            <input name="name" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Crypto Kitty" className="signupInputField" required />
                        </div>
                    </div>

                    {/* Description Field */}
                    <div className="signupInputWrapper">
                        <div className="signupInputLabel">Asset Description</div>
                        <div className="signupInputFieldWrapper" style={{ paddingBottom: '95px' }}>
                            <div className="signupInputFieldWrapperLayer"></div>
                            <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add your Description here" className="signupInputField" />
                        </div>
                    </div>

                    <div className="col-sm-6 nftImgCardWrapper">
                        {/* <img src={profileAvatar} style={{ width: '100%', height: '100%' }} /> */}
                        <img src={avatarPreview} style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div className="col-sm-6 signupFormSectionCol" style={{ paddingLeft: 30 }}>
                        <div className="signupFormCol1Row1Text1">Asset picture</div>
                        {/* <div className="signupFormCol1Row1Text2">We recommend an image of at <br />least 400x400. 🙌</div> */}
                        <div className="uploadSignupBtnWrapper">
                            <div className="uploadSignupBtn">
                                <label style={{ cursor: 'pointer' }} htmlFor="uploadPhoto" className="uploadSignupBtnLayer">
                                    Upload
                                </label>
                                <input name='avatar' id="uploadPhoto" onChange={avatarUpdate} type="file" className="uploadSignupBtnLayer" accept='images/*' />

                            </div>
                        </div>
                    </div>
                    <div className="fullHr" style={{ marginTop: 30 }}></div>
                    {/* <div className="signupFormCol1Row1Text1">My Account</div> */}

                    {/* Form starts here */}



                    {/* { Wallet } */}
                    <div className="signupInputWrapper">
                        <div className="signupInputLabel">Asset Price in ETH</div>
                        <div className="signupInputFieldWrapper">
                            <div className="signupInputFieldWrapperLayer"></div>
                            <input type="number" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="0.8" className="signupInputField" required />
                        </div>
                    </div>
                    <div className="fullHr" style={{ marginTop: 30 }}></div>
                    {/* Save Profile Button starts here  */}
                    <button type="submit" className="saveProfileBtn">
                        List
                    </button>



                    {/* Form starts here */}
                </div>
            </form>
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

export default CreateNFT;
