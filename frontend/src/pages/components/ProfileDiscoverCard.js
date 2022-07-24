import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import discoverCardRow2Img1 from "../../assets/images/trendingImg6.png";
import discoverCardRow3Col1Img from "../../assets/images/discoverCardRow3Col1Img.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getUsersNft } from "../../redux/actions/nftActions"

const ProfileDiscoverCard = (props) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, user } = userDetails
  const ownedNft = useSelector((state) => state.ownedNft)

  const { nft, error } = ownedNft;
  console.log(nft)

  useEffect(() => {
    if (!userInfo) {
      window.location.href = '/'
    }
    // dispatch(getUsersNft(userInfo._id));
    if (!nft) {
      dispatch(getUsersNft(userInfo._id));
    }
    // else if (!user || !user.name) {
    // dispatch(getUserDetails(userInfo._id))
    // }
  }, [dispatch, nft, userInfo])
  console.log(nft.length)
  return (
    <>
      <Link to="/discoverSingle" className="col-sm-4 dicoverCard">
        <div className="discoverCardThumbnailWrapper">
          <img src={props.thumbnail} className="popularCardThumbnailImg" />
        </div>
        <div className="row discoverCardRow1">
          <div className="col-sm-9">
            <div className="discoverCardRow1Title">Amazing digit art</div>
          </div>
          <div className="col-sm-3 popularCardLastRowButtonWrapper">
            <div className="popularCardLastRowButton">2.45 ETH</div>
          </div>
        </div>

        <div className="discoverCardRow2 row">
          <div className="col-sm-8">
            <div className="discoverCardRow2ImgsWrapper">
              <div className="discoverCardRow2ImgContainer" style={{ right: 0 }}>
                <img src={user?.avatar?.url || discoverCardRow2Img1} className="discoverCardRow2Img" />
              </div>
              {/* <div className="discoverCardRow2ImgContainer" style={{ right: 10 }}>
                <img src={user?.avatar?.url || discoverCardRow2Img1} className="discoverCardRow2Img" />
              </div>
              <div className="discoverCardRow2ImgContainer" style={{ right: 20 }}>
                <img src={user?.avatar?.url || discoverCardRow2Img1} className="discoverCardRow2Img" />
              </div> */}
            </div>
          </div>
          <div className="col-sm-4 text-center">
            <div className="discoverCardRow2Col2Text">4 in stock</div>
          </div>
        </div>

        <div className="discoverCardRow3 row">
          <div className="col-sm-8 discoverCardRow3Col1">
            <img src={discoverCardRow3Col1Img} />
            <div className="discoverCardRow3Col1Text1">
              Highest bid
              <span className="discoverCardRow3Col1Text2">0.001 ETH</span>
            </div>
          </div>
          <div className="col-sm-4 text-center">
            <div className="discoverCardRow3Col1Text1">New bid 🔥</div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProfileDiscoverCard;
