/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import discoverCardRow2Img1 from "../../assets/images/trendingImg6.png";
import discoverCardRow3Col1Img from "../../assets/images/discoverCardRow3Col1Img.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
// import Image from 'react-bootstrap/Image'
// import { getUsersNft } from "../../redux/actions/nftActions"
import axios from 'axios';

const ProfileDiscoverCard = ({ ipfsDataLink, thumbnail, len }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, user } = userDetails
  // const ownedNft = useSelector((state) => state.ownedNft)
  const [nftMetadata, setNftMetadata] = useState({})
  const [imgBlob, setImgBlob] = useState(null);
  // const [image, setImage] = useState(new Image())
  // const { nft, error } = ownedNft;
  // console.log(nft)
  // var image = new Image();
  // var blob = '';
  async function getNftMetaData() {
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
      setImgBlob(blob);
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
    if (!userInfo) {
      window.location.href = '/'
    }

    if (nftMetadata) {
      getNftMetaData();
      //   axios.get(`${ipfsDataLink}`)
      //     .then(res => {
      //       console.log(res.data)
      //       setNftMetadata(res.data)
      //     })
      //     .catch(err => {
      //       console.log(err)
      //     })
      // }
      // else if (!user || !user.name) {
      // dispatch(getUserDetails(userInfo._id))
    }
  }, [dispatch, userInfo])

  // console.log(nft[0])
  return (
    <>
      <Link to="/discoverSingle" className="col-sm-4 dicoverCard">
        <div className="discoverCardThumbnailWrapper">
          <img src={imgBlob || thumbnail} className="popularCardThumbnailImg" />
          {/* <img src={{ uri: blob }} style={{ height: 200, width: null, flex: 1 }} /> */}
          {/* <img src={URL.createObjectURL(image)} /> */}
        </div>
        <div className="row discoverCardRow1">
          <div className="col-sm-9">
            <div className="discoverCardRow1Title">
              {/* Amazing digit art */}
              {nftMetadata.name}
            </div>
          </div>
          <div className="col-sm-3 popularCardLastRowButtonWrapper">
            <div className="popularCardLastRowButton">
              {/* 2.45 ETH */}
              {nftMetadata.price} ETH
            </div>
          </div>
        </div>

        <div className="discoverCardRow2 row">
          <div className="col-sm-8">
            <div className="discoverCardRow2ImgsWrapper">
              <div className="discoverCardRow2ImgContainer" style={{ right: 0 }}>
                <img src={user?.avatar?.url || discoverCardRow2Img1} className="discoverCardRow2Img" />
              </div>
              <div className="discoverCardRow2ImgContainer" style={{ right: 10 }}>
                <img src={user?.avatar?.url || discoverCardRow2Img1} className="discoverCardRow2Img" />
              </div>
              <div className="discoverCardRow2ImgContainer" style={{ right: 20 }}>
                <img src={user?.avatar?.url || discoverCardRow2Img1} className="discoverCardRow2Img" />
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
    </>
  );
};

export default ProfileDiscoverCard;
