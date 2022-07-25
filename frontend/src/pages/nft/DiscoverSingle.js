import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

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
import PopularCard from "../components/PopularCard";
import popularCardThumbnail1 from "../../assets/images/popularCardThumbnail1.png"
import popularCardThumbnail2 from "../../assets/images/popularCardThumbnail2.png"
import popularCardThumbnail3 from "../../assets/images/popularCardThumbnail3.png"
import SigninPopup from "../components/SigninPopup";
import SignUpPopup from "../components/SignUpPopup";
import axios from 'axios';
const DiscoverSingle = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [nftMetadata, setNftMetadata] = useState(null)
  const nftDetails = useSelector((state) => state.nftDetails)
  const { nft, error } = nftDetails;
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, user } = userDetails
  console.log(user)
  const { state } = useLocation();
  let nftId = state?.id;
  if (!nftId) {
    nftId = window.location.pathname.substring(17);
  }
  const dispatch = useDispatch();

  async function getNftMetaData(ipfsDataLink) {
    const res = await axios.get(ipfsDataLink);
    setNftMetadata(res.data)
    console.log(res.data);
    const img = await axios.get(res.data.image);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', ipfsDataLink);
    xhr.responseType = 'blob';
    // var blob = null;
    xhr.onload = function (event) {
      var blob = xhr.response;
      // setImgBlob(blob);
      console.log(blob);
    }
    xhr.send();

    // var imgUrl = ipfsDataLink.createObjectURL(img?.request?.response)
    // console.log(imgUrl)

    // console.log(img?.request?.response.length);
    // var bytes = new Uint8Array(img?.request?.response.length / 2);
    // for (var i = 0; i < img?.request?.response.length; i += 2) {
    //   bytes[i / 2] = parseInt(img?.request?.response.substring(i, i + 2), /* base = */ 16);
    // }
    // let imagee = btoa(new Uint8Array(img?.request?.response).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    // let src = "data:image;base64," + imagee;
    // console.log(src)
    var blob = new Blob([img?.request?.response], { type: 'image/bmp' });
    // image.src = URL.createObjectURL(blob);
    const resp = new Buffer(img?.request?.response, 'binary').toString('base64');
    var file = new File([blob], 'image.bmp', { type: 'image/bmp' });
    console.log(file)
    // setImgBlob(blob)
    // console.log(resp);
    // image.src = URL.createObjectURL(resp);
    // console.log('blob', image);
    // console.log(Base64.encode(blob))
    // image.src = URL.createObjectURL(img?.request?.response);
  }

  useEffect(() => {
    if (nft && nft._id !== nftId) {
      dispatch(getNftDetails(nftId));
    }
    console.log(nft)
    getNftMetaData(nft.ipfsDataLink);
    // console.log(nftMetadata)

  }, [dispatch, nft])
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
                      <img src={profile} className="dsCol2Row4Profile" />
                      <div className="dsCol2Row4ProfileDot"></div>
                    </div>
                  </div>
                  <div className="col-sm-2 dsCol2Row4ProfileTitleWrapper">
                    <div className="dsCol2Row4ProfileTitle">Creator</div>
                    <div className="dsCol2Row4ProfileTitle2">Steve1889</div>
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
