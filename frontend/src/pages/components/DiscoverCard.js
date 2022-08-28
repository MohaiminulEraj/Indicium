import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import discoverCardRow2Img1 from "../../assets/images/trendingImg6.png";
import discoverCardRow3Col1Img from "../../assets/images/discoverCardRow3Col1Img.png";
import DiscoverSingle from '../nft/DiscoverSingle';
import { Link, Route } from "react-router-dom";
import { getUserDetails, getNftOwner } from "../../redux/actions/userActions"
import axios from "axios";
// import jazzicon from "@metamask/jazzicon"
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import canvas from "canvas";
import dotenv from 'dotenv';
dotenv.config();

const DiscoverCard = ({ image, len, thumbnail, id, creator, name, description, price, tokenId }) => {
  const [nftOwnerDetails, setNftOwnerDetails] = useState({})
  const [nftId, setNftId] = useState("");
  const pinataDomain = process.env.REACT_APP_PINATA_DOMAIN + "/ipfs/";
  async function getNftOwnerDetails() {
    if (id) {
      await axios.get(`/api/profile/nftOwner/${id}`).then(res => {
        setNftOwnerDetails(res.data)
        console.log('nftOwnerDetails', res.data)
        // setOwnerStatus(true)
      }).catch(err => {
        console.error(err)
      })

      await axios.get(`/api/nfts/user/${id}`).then(res => {
        setNftId(res.data)
        console.log('nftId', res.data)
        // setOwnerStatus(true)
      }).catch(err => {
        console.error(err)
      })
    }
  }
  console.log({creator})
  // let icon = '';
  // if(creator){
  //     const addr = creator.slice(2, 10);
  //     const seed = parseInt(addr, 16);
  //     icon = jazzicon(20, seed); //generates a size 20 icon
  // }
  // console.log(icon)
  // useEffect(() => {
    // getNftOwnerDetails();
  // }, [])

  return (
    <Link to={"/discoverSingle"} state={{ nftId, image, len, creator, name, description, price, tokenId, nftOwnerDetails }} className="col-sm-3 dicoverCard">
      {/* <Link to={{ pathname: `/DiscoverSingle/:${id}`, query: { id } }} className="col-sm-3 dicoverCard"> */}
      {/* <Link to={"/discoverSingle/:" + id} className="col-sm-3 dicoverCard"> */}
      <div className="discoverCardThumbnailWrapper">
        <img src={image || thumbnail} className="popularCardThumbnailImg" />
      </div>
      <div className="row discoverCardRow1">
        <div className="col-sm-9">
          <div className="discoverCardRow1Title">
            {/* Amazing digit art */}
            {name || "Amazing digit art"}
          </div>
        </div>
        <div className="col-sm-3 popularCardLastRowButtonWrapper">
          <div className="popularCardLastRowButton">{price} ETH</div>
        </div>
      </div>

      <div className="discoverCardRow2 row">
        <div className="col-sm-8">
          <div className="discoverCardRow2ImgsWrapper">
            <div className="discoverCardRow2ImgContainer" style={{ right: 0 }}>
            <Jazzicon diameter={22} seed={jsNumberForAddress(creator)} />
              {/* <img src={nftOwnerDetails?.avatar?.url || discoverCardRow2Img1} className="discoverCardRow2Img" /> */}
            </div>
            <div className="discoverCardRow2ImgContainer" style={{ right: 10 }}>
            <Jazzicon diameter={22} seed={jsNumberForAddress(creator)} />
              {/* <img src={nftOwnerDetails?.avatar?.url || discoverCardRow2Img1} className="discoverCardRow2Img" /> */}
            </div>
            <div className="discoverCardRow2ImgContainer" style={{ right: 20 }}>
            <Jazzicon diameter={22} seed={jsNumberForAddress(creator)} />
              {/* <img src={nftOwnerDetails?.avatar?.url || discoverCardRow2Img1} className="discoverCardRow2Img" /> */}
            </div>
          </div>
        </div>
        <div className="col-sm-4 text-center">
          <div className="discoverCardRow2Col2Text">{len} in stock</div>
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
  );
};

export default DiscoverCard;
