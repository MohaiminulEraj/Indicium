import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderBg from "../../assets/images/HeaderBg.png";
import astranaut from "../../assets/images/Image.png";
import astranautMobile from "../../assets/images/astranautMobile.png";
import "../../styles/Home.css";
import "../../styles/Responsive.css";
import CustomNavbar from "./CustomNavbar";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div className="HeaderBg">
      <img className="headerBgLayer headerBgLayerMobile" src={HeaderBg} />
      {/* Navbar */}
      <CustomNavbar user={props.user} onSigninClick={props.onSigninClick} onSignupClick={props.onSignupClick} />
      {/* Navbar */}
      <div className="container section1Heading section1HeadingMobile">
        Discover Rare <br className="mobileBr" /> Digital
        <br className="deskBr" /> Art &<br className="mobileBr" />
        <span className="section1HeadingSubMobileColor"> Collect NFTs</span>
      </div>

      <div className="container header3rdSection header3rdSectionDesk">
        <div className="row">
          {/* <a href="/create" className="col-3 header3rdSectionCol1"> */}
          <div className="gradientBtn">
            <Link to="/create">Create NFT</Link>
          </div>
          {/* </a> */}
          <div className="col-6 header3rdSectionCol2">
            <div className="astranautImg">
              <img className="header3rdSectionCol2Img" src={astranaut} />
            </div>
          </div>
          <a href="/discover" className="col-3 header3rdSectionCol3">
            <div className="gradientBtn">
              Marketplace
            </div>
          </a>
        </div>
      </div>
      {/* Mobile Resposinve */}
      <div className="container header3rdSectionMobile">
        <div className="row">
          <div className="col-12 text-center header3rdSectionCol2">
            <div className="astranautImg">
              <img className="header3rdSectionCol2Img" src={astranautMobile} />
            </div>
          </div>
        </div>
      </div>
      <div className="row header3rdSectionButtonsMobile showMobile">
        <div className="col-4 header3rdSectionCol3">
          <div className="gradientBtn">Learn more</div>
        </div>
        <div className="col-4 artistCardBtnWrapper">
          <div className="artistCardBtn artistCardBtnMobile">
            <div className="artistCardBtnWrapperLayer">Marketplace</div>
          </div>
        </div>
      </div>
      {/* Mobile Resposinve */}
    </div>
  );
};

export default Header;
