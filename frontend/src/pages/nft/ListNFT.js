import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ethers } from "ethers";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Home.css";
import "../../styles/Responsive.css";
import Footer from "../components/Footer";
import CustomNavbar from "../components/CustomNavbar";
import discoverSingleThumbnail from "../../assets/images/NFTSingle.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import heart from "../../assets/images/heart.png";
import share from "../../assets/images/share.png";
import dots from "../../assets/images/dots.png";
import dsCol2row2Img from "../../assets/images/dsCol2row2Img.png";
import { faChevronDown, faHourglass, faHourglassHalf, faTag } from "@fortawesome/free-solid-svg-icons";
import profile from "../../assets/images/profile.png"
import { getNftDetails } from "../../redux/actions/nftActions"
import { getUserDetails, getNftOwner } from "../../redux/actions/userActions"
import PopularCard from "../components/PopularCard";
import popularCardThumbnail1 from "../../assets/images/popularCardThumbnail1.png"
import popularCardThumbnail2 from "../../assets/images/popularCardThumbnail2.png"
import popularCardThumbnail3 from "../../assets/images/popularCardThumbnail3.png"
import SigninPopup from "../components/SigninPopup";
import SignUpPopup from "../components/SignUpPopup";
import NftMarket from '../../contracts/NftMarket.json';
import Message from '../components/Message'
import Loader from '../components/Loader'
import Spinner from '../components/Spinner'
import { Link } from "react-router-dom";
import axios from 'axios';
import useSWR from "swr";
import dotenv from 'dotenv';
dotenv.config();

const DiscoverSingle = (props) => {
    const [showPopup, setShowPopup] = useState(false);
    const [showSignupPopup, setShowSignupPopup] = useState(false);
    const [ownerStatus, setOwnerStatus] = useState(false);
    const [nftMetadata, setNftMetadata] = useState(null);
    const [account, setAccount] = useState(null);
    const nftDetails = useSelector((state) => state.nftDetails)
    const { nft, error } = nftDetails;
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    // const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_PROVIDER);
    const [message, setMessage] = useState("");
    const [variant, setVariant] = useState("");
    const pinataDomain = process.env.REACT_APP_PINATA_DOMAIN + "/ipfs/";
    const [status, setStatus] = useState(false);
    const [price, setPrice] = useState(null);

    const provider= new ethers.providers.Web3Provider(
        window.ethereum
    )
      provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, NftMarket.abi, signer);

    // get the end user
    if (!status && account === null) {
        setStatus(true);
    }
    console.log('contract', contract);
    // const [nftOwnerDetails, setNftOwnerDetails] = useState({})
    // const { nftOwner } = nftOwnerDetails
    // console.log('nftOwner', nftOwner)
    const { state } = useLocation();
    let tokenId = state?.tokenId || null;
    let nftId = state?.id;
    let name = state?.name;
    let description = state?.description;
    let image = state?.image;
    // let price = state?.price;
    let creator = state?.creator;
    let len = state?.len;
    let nftOwnerDetails = state?.nftOwnerDetails;
    console.log('nftOwnerDetails', nftOwnerDetails)

    useEffect(() => {
        if (!tokenId) {
            window.location.href = '/profile';
        }
    }, [tokenId])

    const handleAccountsChanged = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            setAccount(accounts[0]);
            console.log('handleAccountsChangedFunc', account);
            if (account.length === 0) {
                setMessage("Please, connect to web3 wallet.");
                setVariant('danger');
                console.error("Please, connect to Web3 wallet");
            }   
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        handleAccountsChanged();
        // window.ethereum?.on("accountsChanged", handleAccountsChanged);
        // return () => {
        //   window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
        // }
    })
    console.log('loggedMetaMaskAccount', account)
    // async function getNftMetaData(ipfsDataLink) {
    //     const config = {
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     }
    //     let res = null;
    //     if (ipfsDataLink) {
    //         res = await axios.get(ipfsDataLink, config);
    //     }
    //     console.log(res?.data);
    //     setNftMetadata(res?.data || null)
    // }

    // async function getNftOwnerDetails(nftOwner) {
    //   await axios.get(`/api/profile/nftOwner/${nftOwner}`).then(res => {
    //     setNftOwnerDetails(res.data)
    //     console.log('nftOwnerDetails', res.data)
    //     // setOwnerStatus(true)
    //   }).catch(err => {
    //     console.error(err)
    //   })
    // }

    window.ethereum.on('accountsChanged', function (accounts) {
        // Time to reload your interface with accounts[0]!
        setAccount(accounts[0]);
        console.log('accounts', accounts);
    })

    const listNft = async (e) => {
        e.preventDefault();
        if (!price || price === '0') {
            setMessage('Please enter a valid price');
            setVariant('danger');
            return;
        }
        console.log('hello!')
        // price = ethers.utils.parseEther(price);
        try {
            // setPrice(parseFloat(ethers.utils.parseEther(price?.toString())));
            console.log(parseFloat(ethers.utils.parseEther(price?.toString())))
            console.log('b4NftListing');
            const listNft = await contract?.placeNftOnSale(tokenId, account, ethers.utils.parseEther(price?.toString()), {
                value: ethers.utils.parseEther(0.025.toString())
            });
            await listNft.wait();
            setMessage('NFT Item Listed successfully');
            setVariant('success');
            console.log('nftListed', listNft);
            window.location.href = '/profile'
        } catch (error) {
            console.error(error);
            // setMessage(error);
            // setVariant('danger');
        }
    }


    return (
        <div className="body">
            {/* Section2 */}

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

            <div className="discoverSingleSection">
                <div className="container">
                    <div className="discoverSingleContainer">
                        <div className="row">
                            <div className="col-sm-5">
                                <div className="discoverSingleContainerCol1Thumbnail">
                                    <img
                                        src={image || discoverSingleThumbnail}
                                        className="discoverSingleThumbnail"
                                    />
                                </div>
                            </div>

                            <div className="col-sm-6 discoverSingleCol2Wrapper">
                                <div className="discoverSingleCol2Title">{name || "3D Glassy Pyramid"}</div>
                                <div className="discoverSingleCol2Row1 row">
                                    <div className="col-sm-4">
                                        <div className="discoverSingleCol2Row1Col1Text">
                                            <span>Views: 0</span>
                                            <span>In stock: {len || 1}</span>
                                        </div>
                                    </div>

                                    {/* <div className="col-sm-7 discoverSingleCol2Row1Col2Wrapper">
                                        <div className="discoverSingleCol2Row1Col2BtnContainer">
                                            <div className="discoverSingleCol2Row1Col2BtnWrapper">
                                                <img src={heart} className="heartIcon" />
                                                <span className="discoverSingleCol2Row1Col2BtnWrapperText">
                                                    234
                                                </span>
                                            </div>
                                        </div>

                                        <div className="discoverSingleCol2Row1Col2BtnContainer2">
                                            <div className="discoverSingleCol2Row1Col2BtnWrapper">
                                                <img src={share} className="shareIcon" />
                                            </div>
                                        </div>

                                        <div className="discoverSingleCol2Row1Col2BtnContainer2">
                                            <div className="discoverSingleCol2Row1Col2BtnWrapper">
                                                <img src={dots} className="shareIcon" />
                                            </div>
                                        </div>
                                    </div> */}
                                </div>

                                {/* <div className="row dsCol2Row2">
                                    <div className="col-sm-4 dsCol2Row2Text1">Current Price</div>
                                </div>
                                <div className="dsCol2Row3Text1">
                                    {price || "0"} ETH
                                </div> */}

                                {/* <div className="row dsCol2Row3">
                                    <div className="col-sm-3" style={{ display: 'flex' }}>
                                        <div className="trendingSecBtnWrapper dsCol2Row3Btn"
                                        >
                                            <button onClick={buyNft} className="trendingSecBtn">
                                                <FontAwesomeIcon icon={faTag} />
                                                <span style={{ marginLeft: 10 }}> Buy Now</span>
                                            </button>
                                        </div>
                                    </div>
                                </div> */}


                                {/* { Wallet } */}
                                <form>
                                    <div className="signupInputWrapper">
                                        <div className="signupInputLabel">Asset Price in ETH</div>
                                        <div className="signupInputFieldWrapper">
                                            <div className="signupInputFieldWrapperLayer"></div>
                                            <input type="number" value={price} step={0.01} min={0} max={10} onChange={(e) => setPrice(e.target.value)} placeholder="0.8" className="signupInputField" required />
                                        </div>
                                    </div>
                                    <div className="fullHr" style={{ marginTop: 30 }}></div>
                                    <div className="row dsCol2Row4">
                                        <div className="col-sm-1">
                                            <div className="dsCol2Row4ProfileWrapper">
                                            <Jazzicon diameter={36} seed={jsNumberForAddress(creator)} />
                                                {/* <img src={nftOwnerDetails?.avatar?.url || profile} className="dsCol2Row4Profile" /> */}
                                                <div className="dsCol2Row4ProfileDot"></div>
                                            </div>
                                        </div>
                                        <div className="col-sm-2 dsCol2Row4ProfileTitleWrapper">
                                            <div className="dsCol2Row4ProfileTitle">Owner</div>
                                            <div className="dsCol2Row4ProfileTitle2">{"0x********" + creator?.slice(-4) || "Steve1889"}</div>
                                        </div>
                                        <div className="col-sm-1 dsCol2Row4ProfileTitleWrapper">
                                        </div>
                                        <div className="col-sm-2 dsCol2Row4ProfileTitleWrapper">
                                            <div className="dsCol2Row4ProfileTitle">Price</div>
                                            <div className="dsCol2Row4ProfileTitle2">{price || "0"} ETH</div>
                                        </div>
                                    </div>
                                    <div className="fullHr" style={{ marginTop: 30 }}></div>
                                    {/* Save Profile Button starts here  */}
                                    <button type="submit" onClick={listNft} className="saveProfileBtn">
                                        List NFT
                                    </button>
                                </form>
                                <div className="dsCol2Row6 row">
                                    {/* <div className="col-sm-1">
                                        <div className="dsCol2Row6Text1">Tags :</div>
                                    </div>
                                    <div className="col-sm-8 dsCol2Row6BtnContainer">
                                        <div className="dsCol2Row6Btn">
                                            <div className="dsCol2Row6BtnLayer"></div>
                                            #Netfly
                                        </div>
                                        <div className="dsCol2Row6Btn">
                                            <div className="dsCol2Row6BtnLayer"></div>
                                            #Rare
                                        </div>
                                        <div className="dsCol2Row6Btn">
                                            <div className="dsCol2Row6BtnLayer"></div>
                                            #Art
                                        </div>
                                    </div> */}
                                    <div className="col-sm-12 mt-4">
                                        {message && <Message variant={variant}>{message}</Message>}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Popular Cards Starts her */}
                    <div className="dsPopularCont">
                        <div className="row trending" style={{ marginBottom: 40 }}>
                            <div className="col-sm-8" >
                                <div className="trendingTitle showDeskFlex">Top Artist</div>
                                <div className="trendingTitle showMobile">Related Artworks</div>
                            </div>
                            <div className="col-sm-4 secHeadDateCol showDeskFlex">
                                <div className="trendingDateWrapper ">
                                    <div className="trendingDateText">Today</div>
                                    <a href="#" className="trendingDateArrow">
                                        <FontAwesomeIcon icon={faChevronDown} color="white" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="row popularCollectioContainer">
                            <PopularCard thumbnail={popularCardThumbnail1} />
                            <PopularCard thumbnail={popularCardThumbnail2} />
                            <PopularCard thumbnail={popularCardThumbnail3} />
                        </div>

                        <div className="trendingSecBtnWrapper">
                            <div className="trendingSecBtn">
                                MarketPlace
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default DiscoverSingle;
