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
import axios from 'axios';
const DiscoverSingle = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [ownerStatus, setOwnerStatus] = useState(false);
  const [nftMetadata, setNftMetadata] = useState(null)
  const nftDetails = useSelector((state) => state.nftDetails)
  const { nft, error } = nftDetails;
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, user } = userDetails
  const nftOwnerDetails = useSelector((state) => state.nftOwnerDetails)
  const { nftOwner } = nftOwnerDetails
  // console.log('nftOwner', nftOwner)
  const { state } = useLocation();
  let nftId = state?.id;
  if (!nftId) {
    nftId = window.location.pathname.substring(17);
  }
  const dispatch = useDispatch();

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

    // const img = await axios.get(res.data.image);
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', ipfsDataLink);
    // xhr.responseType = 'blob';
    // // var blob = null;
    // xhr.onload = function (event) {
    //   var blob = xhr.response;
    //   // setImgBlob(blob);
    //   console.log(blob);
    // }
    // xhr.send();
  }

  useEffect(() => {
    if (!nft) {
      dispatch(getNftDetails(nftId));
    } else if (nft?._id !== nftId) {
      dispatch(getNftDetails(nftId));
    }
    else {
      getNftMetaData(nft?.ipfsDataLink);
      console.log('nftLink', nft?.ipfsDataLink);
    }
    console.log('nftMetadata', nftMetadata)
    console.log(nft?.userId)
    if (nft?.userId && !ownerStatus) {
      dispatch(getNftOwner(nft?.userId));
      setOwnerStatus(true);
    } else {
      console.log('nftOwnerUpdated', nftOwner);
    }

    if (userInfo?._id && !user?.name) {
      dispatch(getUserDetails(userInfo?._id));
    }
    // console.log(nftMetadata)
    console.log('nft.userId', nft?.userId)
  }, [dispatch, nft, nftOwner]);

  // useEffect(() => {
  //   console.log('nft.userId', nft?.userId)
  //   if (!ownerStatus) {
  //     dispatch(getNftOwner(nft?.userId));
  //     setOwnerStatus(true);
  //   } else {
  //     console.log('nftOwnerUpdated', nftOwner);
  //   }
  // }, [dispatch, nftOwner])
  // window.ethereum.send('eth_requestAccounts');
  const contractAddress = '0x6026089Ec9A7f2E55e2439998d500A34D801575C';

  // const provider = new ethers.providers.JsonRpcProvider('http://localhost:7545');

  // // get the end user
  // const signer = provider.getSigner();
  // const contract = new ethers.Contract(contractAddress, NftMarket.abi, signer);

  // get the smart contract
  // console.log(contract)

  // async () => {
  //   const nfts = [];
  //   const coreNfts = await contract?.getAllNftsOnSale();

  //   for (let i = 0; i < coreNfts.length; i++) {
  //     const item = coreNfts[i];
  //     const tokenURI = await contract?.tokenURI(item?.tokenId);
  //     const metaRes = await fetch(tokenURI);
  //     const meta = await metaRes.json();

  //     nfts.push({
  //       price: parseFloat(ethers.utils.formatEther(item.price)),
  //       tokenId: item.tokenId.toNumber(),
  //       creator: item.creator,
  //       isListed: item.isListed,
  //       meta
  //     })
  //   }

  //   return nfts;
  // }

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
                    src={discoverSingleThumbnail}
                    className="discoverSingleThumbnail"
                  />
                </div>
              </div>

              <div className="col-sm-6 discoverSingleCol2Wrapper">
                <div className="discoverSingleCol2Title">{nftMetadata?.name || "3D Glassy Pyramid"}</div>
                <div className="discoverSingleCol2Row1 row">
                  <div className="col-sm-4">
                    <div className="discoverSingleCol2Row1Col1Text">
                      <span>Views: 0</span>
                      <span>In stock: 1</span>
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
                  {nftMetadata?.price || "2.00"} ETH
                  <span className="dsCol2Row3Text2">($3,618.36)</span>
                </div>

                <div className="row dsCol2Row3">
                  <div className="col-sm-6" style={{ display: 'flex' }}>
                    <div className="trendingSecBtnWrapper dsCol2Row3Btn">
                      <div className="trendingSecBtn">
                        <FontAwesomeIcon icon={faTag} />
                        <span style={{ marginLeft: 10 }}> Buy Now</span>
                      </div>
                    </div>
                    <div className="trendingSecBtnWrapper dsCol2Row3Btn">
                      <div className="trendingSecBtn">
                        <FontAwesomeIcon icon={faHourglassHalf} />
                        <span style={{ marginLeft: 10 }}>Make offer</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row dsCol2Row4">
                  <div className="col-sm-1">
                    <div className="dsCol2Row4ProfileWrapper">
                      <img src={nftOwner?.avatar?.url || profile} className="dsCol2Row4Profile" />
                      <div className="dsCol2Row4ProfileDot"></div>
                    </div>
                  </div>
                  <div className="col-sm-2 dsCol2Row4ProfileTitleWrapper">
                    <div className="dsCol2Row4ProfileTitle">Creator</div>
                    <div className="dsCol2Row4ProfileTitle2">{nftOwner?.name || "Steve1889"}</div>
                  </div>
                </div>

                <div className="dsCol2Row5Text">{nftMetadata?.description || "Glassy Cube on the Block is a collection of 10,000 unique Cube NFTs. They live, as you have guessed by the name, in the Ethereum blockchain. They were aesthetically perfected to please the human eye and their owners have exclusive access to a community wallet."}
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
