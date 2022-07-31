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
  const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_PROVIDER);
  const [message, setMessage] = useState("");
  const pinataDomain = process.env.REACT_APP_PINATA_DOMAIN + "/ipfs/";
  const [status, setStatus] = useState(false);

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
  let price = state?.price;
  let creator = state?.creator;
  let len = state?.len;
  let nftOwnerDetails = state?.nftOwnerDetails;
  console.log('nftOwnerDetails', nftOwnerDetails)

  // const { data, mutate, isValidating, ...swr } = useSWR(
  //   provider ? "web3/useAccount" : null,
  //   async () => {
  //     const accounts = await provider?.listAccounts();
  //     const account = accounts[0];
  //     // setAccount(accounts[0]);
  //     if (!account) {
  //       throw "Cannot retreive account! Please, connect to web3 wallet."
  //     }

  //     return account;
  //   }, {
  //   revalidateOnFocus: false,
  //   shouldRetryOnError: false
  // }
  // )

  useEffect(() => {
    if (!tokenId) {
      window.location.href = '/discover';
    }
  }, [tokenId])

  const handleAccountsChanged = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    setAccount(accounts[0]);
    console.log('handleAccountsChangedFunc', account);
    if (account.length === 0) {
      setMessage("Please, connect to web3 wallet.");
      console.error("Please, connect to Web3 wallet");
    }
    // else if (accounts[0] !== data) {
    //   mutate(accounts[0]);
    // }
  }


  useEffect(() => {
    handleAccountsChanged();
    // window.ethereum?.on("accountsChanged", handleAccountsChanged);
    // return () => {
    //   window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    // }
  })
  console.log('loggedMetaMaskAccount', account)
  async function getNftMetaData(ipfsDataLink) {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }
    let res = null;
    if (ipfsDataLink) {
      res = await axios.get(ipfsDataLink, config);
    }
    console.log(res?.data);
    setNftMetadata(res?.data || null)
  }

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


  const buyNftHandler = async () => {
    try {
      // const provider = ethers.getDefaultProvider('ropsten');
      // const wallet = provider.getSigner();
      // const contract = new ethers.Contract(NftMarket.networks['3'].address, NftMarket.abi, wallet);
      // const tx = await contract.buyNft(nftId, { value: ethers.utils.parseEther('0.1') });
      // console.log(tx.hash);

      // window.ethereum.send('eth_requestAccounts');


      // const contractAddress = '0xAC868650a24224cd133473F1933e1f5fb7924142';
      // const contractAddress = '0x079fA92A1D65716a626690556b3FbbA160c4fbc0';
      // const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
      // console.log('contractAddress', contractAddress);
      // const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_PROVIDER);

      // // get the end user
      // const signer = provider.getSigner();
      // const contract = new ethers.Contract(contractAddress, NftMarket.abi, signer);

      // // get the smart contract
      // console.log(contract)
      console.log('funct called', tokenId);
      const nfts = [];
      if (tokenId && tokenId !== 'myToken') {
        const coreNfts = await contract?.getNftItem(tokenId);
        console.log('coreNfts', coreNfts);

        // for (let i = 0; i < coreNfts.length; i++) {
        //   const item = coreNfts[i];
        //   console.log('item', item)
        //   const tokenURI = await contract?.tokenURI(item?.tokenId);
        //   console.log('tokenURI', tokenURI);
        //   const metaRes = await fetch(tokenURI);
        //   // console.log('metaRes', metaRes);
        //   const meta = await metaRes.json();
        //   // console.log('meta', meta);

        //   nfts.push({
        //     price: parseFloat(ethers.utils.formatEther(item.price)),
        //     tokenId: item.tokenId.toNumber(),
        //     creator: item.creator,
        //     isListed: item.isListed,
        //     meta
        //   })
        // }

        const tokenURI = await contract?.tokenURI(coreNfts?.tokenId);
        console.log('tokenURI', tokenURI);
        const metaRes = await fetch(tokenURI);
        // console.log('metaRes', metaRes);
        const meta = await metaRes.json();
        // console.log('meta', meta);

        nfts.push({
          price: parseFloat(ethers.utils.formatEther(coreNfts.price)),
          tokenId: coreNfts.tokenId.toNumber(),
          creator: coreNfts.creator,
          isListed: coreNfts.isListed,
          meta
        })
        console.log('nfts', nfts)
        return nfts;

      }
      return null;
    } catch (error) {
      setMessage(error);
      console.error(error);
    }
  }


  const buyNft = async () => {
    try {
      if (!userInfo?._id) {
        setShowPopup(true);
        return;
      }
      const nfts = await buyNftHandler();
      if (nfts !== null) {
        console.log('creator', nfts[0].creator);
        console.log('account', account);
        try {
          console.log('b4BuyNft');
          const buyNft = await contract?.buyNft(nfts[0].tokenId, account);
          setMessage('NFT bought successfully');
          console.log('buyNft', JSON.parse(buyNft));
          window.location.href = '/profile'

        } catch (error) {
          if (error?.error?.stack) {
            setMessage(JSON.parse(JSON.stringify(error?.error?.stack))?.substring(57, 81) + "!");
            console.error(JSON.parse(JSON.stringify(error?.error?.stack)));
          }
        }
      } else {
        setMessage('You Already Own this NFT!');
      }
    } catch (error) {
      setMessage(error);
      console.error(error);
    }
    // console.log(event);
    // console.log(param);
  };


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
                    src={pinataDomain + image || discoverSingleThumbnail}
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
                      <span>In stock: {len}</span>
                    </div>
                  </div>

                  <div className="col-sm-7 discoverSingleCol2Row1Col2Wrapper">
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
                  </div>
                </div>

                <div className="row dsCol2Row2">
                  <div className="col-sm-4 dsCol2Row2Text1">Current Price</div>
                  <div className="col-sm-4 dsCol2Row2Text2Wrapper">
                    <img src={dsCol2row2Img} />
                    <span className="dsCol2Row2Text2">+2.48%</span>
                  </div>
                </div>
                <div className="dsCol2Row3Text1">
                  {price || "2.00"} ETH
                  <span className="dsCol2Row3Text2">($3,618.36)</span>
                </div>

                <div className="row dsCol2Row3">
                  <div className="col-sm-3" style={{ display: 'flex' }}>
                    <div className="trendingSecBtnWrapper dsCol2Row3Btn"
                    >
                      <button onClick={buyNft} className="trendingSecBtn">
                        <FontAwesomeIcon icon={faTag} />
                        <span style={{ marginLeft: 10 }}> Buy Now</span>
                      </button>
                    </div>
                    {/* <div className="trendingSecBtnWrapper dsCol2Row3Btn">
                      <div className="trendingSecBtn">
                        <FontAwesomeIcon icon={faHourglassHalf} />
                        <span style={{ marginLeft: 10 }}>Make offer</span>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className="row dsCol2Row4">
                  <div className="col-sm-1">
                    <div className="dsCol2Row4ProfileWrapper">
                      <img src={nftOwnerDetails?.avatar?.url || profile} className="dsCol2Row4Profile" />
                      <div className="dsCol2Row4ProfileDot"></div>
                    </div>
                  </div>
                  <div className="col-sm-2 dsCol2Row4ProfileTitleWrapper">
                    <div className="dsCol2Row4ProfileTitle">Creator</div>
                    <div className="dsCol2Row4ProfileTitle2">{nftOwnerDetails?.name || "Steve1889"}</div>
                  </div>
                </div>

                <div className="dsCol2Row5Text">{description || "Glassy Cube on the Block is a collection of 10,000 unique Cube NFTs. They live, as you have guessed by the name, in the Ethereum blockchain. They were aesthetically perfected to please the human eye and their owners have exclusive access to a community wallet."}
                </div>

                <div className="dsCol2Row6 row">
                  <div className="col-sm-1">
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
                  </div>
                  <div className="col-sm-12 mt-4">
                    {message && <Message variant='danger'>{tokenId !== "myToken" && tokenId !== null && message}</Message>}
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
