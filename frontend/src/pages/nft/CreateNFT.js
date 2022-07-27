import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Home.css";
import "../../styles/Responsive.css";
// import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomNavbar from "../components/CustomNavbar";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronDown, faSpinner } from "@fortawesome/free-solid-svg-icons";
// import DiscoverCard from "../components/DiscoverCard";
// import discoverCardThumbnail1 from "../../assets/images/discoverCardThumbnail1.png";
// import discoverCardThumbnail2 from "../../assets/images/discoverCardThumbnail2.png";
// import discoverCardThumbnail3 from "../../assets/images/discoverCardThumbnail3.png";
// import discoverCardThumbnail4 from "../../assets/images/discoverCardThumbnail4.png";
import blackImg from "../../assets/images/blackImg.png";
import SigninPopup from "../components/SigninPopup";
import SignUpPopup from "../components/SignUpPopup";
import axios from "axios";
import fs from 'fs';
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../../redux/actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Spinner from '../components/Spinner'
// import WalletBalance from '../components/providers/web3/WalletBalance';
import { v4 as uuidv4 } from "uuid";
import NftMarket from '../../contracts/NftMarket.json';
import { ethers } from 'ethers';
// import pinataSDK from '@pinata/sdk';
import FormData from "form-data";
import { saveNftDetails } from "../../redux/actions/nftActions"
import dotenv from 'dotenv';
dotenv.config();

// const PINATA_API_KEY = '00951809b073d0a55e9a';
// const PINATA_SECRET_API_KEY = '3b1089f9a77e2f6cee967aeab3bcda8c9427e519b118f07bbf274ae00993983f';

// let pinataApiKey_NFT = "06ce9ba7b279fe677acf";
const pinataApiKey = process.env.REACT_APP_PINATA_API_KEY;
// let pinataSecretKey_NFT = "558009c248624baee84c3a321cbeff8a8963ee851c19dd7d6395744de974f1ec";
const pinataSecretKey = process.env.REACT_APP_PINATA_SECRET_API_KEY;
const pinataDomain = process.env.REACT_APP_PINATA_DOMAIN;

// const pinata = pinataSDK(pinataApiKey, pinataSecretKey);


// import { useWeb3 } from '@providers/web3';

const CreateNFT = (props) => {


    // const { ethereum, contract } = useWeb3();
    const dispatch = useDispatch();
    const saveNft = useSelector((state) => state.saveNft)
    const { error, nftDetails } = saveNft

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector((state) => state.userDetails)
    const { user } = userDetails

    const [showPopup, setShowPopup] = useState(false);
    const [showSignupPopup, setShowSignupPopup] = useState(false);
    const [message, setMessage] = useState(null);
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(blackImg);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(null);
    const [isMinted, setIsMinted] = useState(false);
    const [totalMinted, setTotalMinted] = useState(0);
    const [nftURI, setNftURI] = useState('');
    let [file, setFile] = useState('')
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);


    // let tokenId = "NftMarket"

    // const contentId = 'QmXVmZoTRgxin2v2aTsVoCjCXW6fg9FzGK1oQ64ZMrqKKB';
    // const metadataURI = `${contentId}/${tokenId}.json`;
    // const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;

    useEffect(() => {
        if (!userInfo) {
            window.location.href = '/'
        } else if (!user || !user.name) {
            dispatch(getUserDetails(userInfo._id))
        }
    }, [dispatch, user, userInfo])

    useEffect(() => {
        if (nftDetails) {
            // console.log(Object.keys(nftDetails).length)
            window.location.href = '/profile'
        }
    }, [nftDetails])

    // useEffect(() => {
    //     getCount();
    // }, []);

    const getCount = async (contract) => {
        const count = await contract?.count();
        console.log(parseInt(count));
        setTotalMinted(parseInt(count));
    };


    const getSignedData = async () => {

        const jsonRes = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
            pinataMetadata: {
                name: uuidv4()
            },
            pinataContent: {
                name,
                description
            }
        }, {
            headers: {
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretKey
            }
        });
        console.log(jsonRes.data)
        return jsonRes?.data;
        // const messageToSign = await axios.get("/api/verify");
        // const accounts = await ethereum?.request({ method: "eth_requestAccounts" });
        // const account = accounts[0];

        // const signedData = await ethereum?.request({
        //     method: "personal_sign",
        //     params: [JSON.stringify(messageToSign.data), account, messageToSign.data.id]
        // })

        // return { signedData, account };
    }

    // useEffect(() => {
    //     getMintedStatus();
    // }, [isMinted]);

    // const getMintedStatus = async (contract) => {
    //     const result = await contract?.isContentOwned(metadataURI);
    //     console.log(result)
    //     setIsMinted(result);
    // };

    useEffect(() => {
        setImage(image);
        setNftURI(nftURI);
    }, [image, nftURI]);


    // Submiting Metadata
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.log(e.target.files[0])
        console.log(image)
        const jsonRes = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
            pinataMetadata: {
                name: uuidv4()
            },
            pinataContent: {
                name,
                description,
                price,
                image
            }
        }, {
            headers: {
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretKey
            }
        });

        // const res = await toast.promise(
        //     jsonRes.data, {
        //     pending: "Uploading metadata",
        //     success: "Metadata uploaded",
        //     error: "Metadata upload error"
        // }
        // )
        // const data = res.data;

        if (jsonRes?.data?.IpfsHash) {
            setLoading(false);
            setNftURI(pinataDomain + '/ipfs/' + jsonRes?.data?.IpfsHash);
            console.log(pinataDomain + '/ipfs/' + jsonRes?.data?.IpfsHash);
            setMessage('Successfully uploaded NFT Metadata to IPFS!')
        }
        // console.log(nftURI)
        createNft(pinataDomain + '/ipfs/' + jsonRes?.data?.IpfsHash);
        // getMintedStatus(contract);
        // getCount(contract);
    }


    // async function getURI(contract) {
    //     const uri = await contract.tokenURI(tokenId);
    //     alert(uri);
    // }

    const handleImage = async (e) => {
        try {
            // console.log(e.target.files[0].type)
            if (e.target.name === 'avatar') {
                setLoading(true);
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setAvatar(reader.result);
                        setAvatarPreview(reader.result);
                        // blob = reader.result;
                    }
                }
                if (e.target.files[0]) reader.readAsDataURL(e.target.files[0])
                // setFile(e.target.files[0]);
                // console.log(e.target.files)
                let buffer = await e.target.files[0].arrayBuffer();
                const bytes = new Uint8Array(buffer);
                console.log(e.target.files)
                buffer = Buffer.from(Object.values(bytes));
                const formData = new FormData();
                // console.log(new Blob(buffer, { type: 'image/png' }))
                let filename = e.target.files[0].name.replace(/\.[^/.]+$/, "") + "-" + uuidv4();
                console.log(filename)
                formData.append(
                    "file",
                    new Blob(buffer, { type: 'image/png' }),
                    filename
                    // {
                    //     contentType: e.target.files[0]?.type,
                    //     filename: e.target.files[0].name.replace(/\.[^/.]+$/, "") + "-" + uuidv4()
                    // }
                );

                const fileRes = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                    maxBodyLength: Infinity,
                    headers: {
                        // "Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}`,
                        pinata_api_key: pinataApiKey,
                        pinata_secret_api_key: pinataSecretKey,
                        "Content-Type": "multipart/form-data"
                    }
                });
                console.log(fileRes.data)
                setImage(pinataDomain + '/ipfs/' + fileRes?.data?.IpfsHash)
                console.log(`${pinataDomain}/ipfs/${fileRes?.data?.IpfsHash}`)
                setLoading(false);
                setMessage('Image uploaded to IPFS successfully!');
                // console.log(image)
                // console.log(fileRes.data)
                // const res = await toast.promise(
                //     fileRes.data, {
                //     pending: "Uploading image",
                //     success: "Image uploaded",
                //     error: "Image upload error"
                // }
                // )

                // const data = res.data;


                // pinata.pinFileToIPFS(fs.createReadStream(URL.createObjectURL(e.target.files[0])), {}).then((res) => {
                //     console.log(res["IpfsHash"]);
                //     setImage(`${pinataDomain}/ipfs/${res["IpfsHash"]}`)
                // }).catch((err) => {
                //     console.error(err);
                // })

            }
        } catch (e) {
            console.error(e.message);
        }
    }

    const createNft = async (nftURI) => {
        try {
            setLoading(true);
            window.ethereum.send('eth_requestAccounts');
            const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

            const provider = new ethers.providers.JsonRpcProvider('http://localhost:7545');

            // get the end user
            const signer = provider.getSigner();

            // get the smart contract
            const contract = new ethers.Contract(contractAddress, NftMarket.abi, signer);
            console.log(contract)

            const connection = contract.connect(signer);
            const addr = connection.address;
            console.log(nftURI);
            const nftRes = await axios.get(nftURI);
            console.log(nftRes)
            const content = nftRes.data;

            // Object.keys(content).forEach(key => {
            //     if (!ALLOWED_FIELDS.includes(key)) {
            //         throw new Error("Invalid Json structure");
            //     }
            // })
            const tx = await contract?.mintToken(
                nftURI,
                ethers.utils.parseEther(price.toString()),
                {
                    value: ethers.utils.parseEther(0.025.toString())
                }
            );

            await tx.wait();
            console.log('tx', tx)
            if (tx) {
                dispatch(saveNftDetails(user?._id, nftURI))
                setMessage('NFT Minted successfully!');
                // window.location.href = '/';
            }
            setLoading(false);
            // await toast.promise(
            //     tx?.wait(), {
            //     pending: "Minting Nft Token",
            //     success: "Nft has ben created",
            //     error: "Minting error"
            // }
            // );
        } catch (e) {
            setMessage(JSON.parse(e.message));
            console.error(e.message);
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

            {/* {success && <Message variant='success'>Profile Updated</Message>} */}
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
                        <div className="container my-4 px-2">
                            {message && <Message variant='warning'>{message}</Message>}
                            {error && <Message variant='danger'>{error}</Message>}
                            {loading && <Spinner />}
                            {/* {<Spinner />} */}
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

                    {/* <div className="signupFormCol1Row1Text1">My Account</div> */}

                    {/* Form starts here */}

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
                                <input name='avatar' id="uploadPhoto" onChange={handleImage} type="file" className="uploadSignupBtnLayer" accept='images/*' required />

                            </div>
                        </div>
                    </div>
                    <div className="fullHr" style={{ marginTop: 30 }}></div>


                    {/* { Wallet } */}
                    <div className="signupInputWrapper">
                        <div className="signupInputLabel">Asset Price in ETH</div>
                        <div className="signupInputFieldWrapper">
                            <div className="signupInputFieldWrapperLayer"></div>
                            <input type="number" value={price} step={0.01} min={0} onChange={(e) => setPrice(e.target.value)} placeholder="0.8" className="signupInputField" required />
                        </div>
                    </div>
                    <div className="fullHr" style={{ marginTop: 30 }}></div>
                    {/* Save Profile Button starts here  */}
                    <button type="submit" className="saveProfileBtn" disabled={!loading && image ? false : true}>
                        {loading ? "Uploading NFT Metadata.." : "List"}
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
