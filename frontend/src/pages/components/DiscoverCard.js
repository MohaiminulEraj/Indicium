import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import discoverCardRow2Img1 from "../../assets/images/trendingImg6.png";
import discoverCardRow3Col1Img from "../../assets/images/discoverCardRow3Col1Img.png";
import DiscoverSingle from '../nft/DiscoverSingle';
import { Link, Route } from "react-router-dom";
import { getUserDetails, getNftOwner } from "../../redux/actions/userActions"
import axios from "axios";

const DiscoverCard = ({ image, len, thumbnail, id, creator, name, description, price, tokenId }) => {
  const [nftMetadata, setNftMetadata] = useState({})
  const [imgBlob, setImgBlob] = useState(null);
  const [nftOwnerDetails, setNftOwnerDetails] = useState({})
  const [nftId, setNftId] = useState("");

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
  console.log('nftId=>', nftId)
  async function getNftMetaData() {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.get(image, config);
    setNftMetadata(res.data)
    console.log(res.data);
    // const img = await axios.get(res.data.image);
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', image);
    // xhr.responseType = 'blob';
    // // var blob = null;
    // xhr.onload = function (event) {
    //   var blob = xhr.response;
    //   // setImgBlob(blob);
    //   console.log(blob);
    // }
    // xhr.send();

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
    // var blob = new Blob([img?.request?.response], { type: 'image/bmp' });
    // // image.src = URL.createObjectURL(blob);
    // const resp = new Buffer(img?.request?.response, 'binary').toString('base64');
    // var file = new File([blob], 'image.bmp', { type: 'image/bmp' });
    // console.log(file)
    // setImgBlob(blob)
    // console.log(resp);
    // image.src = URL.createObjectURL(resp);
    // console.log('blob', image);
    // console.log(Base64.encode(blob))
    // image.src = URL.createObjectURL(img?.request?.response);
  }

  useEffect(() => {
    // getNftMetaData();
    getNftOwnerDetails();
  }, [])

  return (
    <Link to={"/discoverSingle/:" + nftId[3]} state={{ nftId, image, len, creator, name, description, price, tokenId, nftOwnerDetails }} className="col-sm-3 dicoverCard">
      {/* <Link to={{ pathname: `/DiscoverSingle/:${id}`, query: { id } }} className="col-sm-3 dicoverCard"> */}
      {/* <Link to={"/discoverSingle/:" + id} className="col-sm-3 dicoverCard"> */}
      <div className="discoverCardThumbnailWrapper">
        <img src={thumbnail} className="popularCardThumbnailImg" />
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
              <img src={nftOwnerDetails?.avatar?.url || discoverCardRow2Img1} className="discoverCardRow2Img" />
            </div>
            <div className="discoverCardRow2ImgContainer" style={{ right: 10 }}>
              <img src={nftOwnerDetails?.avatar?.url || discoverCardRow2Img1} className="discoverCardRow2Img" />
            </div>
            <div className="discoverCardRow2ImgContainer" style={{ right: 20 }}>
              <img src={nftOwnerDetails?.avatar?.url || discoverCardRow2Img1} className="discoverCardRow2Img" />
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
