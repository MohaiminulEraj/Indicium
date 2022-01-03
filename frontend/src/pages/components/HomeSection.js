import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Home.css";
import "../../styles/Responsive.css";
import aboutsecimg1 from "../../assets/images/aboutsecimg1.png";
import aboutsecimg2 from "../../assets/images/aboutsecimg2.png";
import aboutsecimg3 from "../../assets/images/aboutsecimg3.png";
import aboutsecimg4 from "../../assets/images/aboutsecimg4.png";
import videoThumbnail from "../../assets/images/videoThumbnail.png";
import getStartedSectionCardImg1 from "../../assets/images/getStartedSectionCardImg1.png";
import getStartedSectionCardImg2 from "../../assets/images/getStartedSectionCardImg2.png";
import getStartedSectionCardImg3 from "../../assets/images/getStartedSectionCardImg3.png";
import partner1 from "../../assets/images/partner1.png";
import partner2 from "../../assets/images/partner2.png";
import partner3 from "../../assets/images/partner3.png";
import partner4 from "../../assets/images/partner4.png";
import partner5 from "../../assets/images/partner5.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
const HomeSection = (props) => {
  return (
    <>
      {/* Section 3 */}
      <div className="aboutUsSection">
        <div className="container">
          <div className="aboutUsSectionTitle aboutUsSectionTitleMobile">
            About Us
          </div>
          <div className="row aboutUsSectionButtonsWrapper">
            <div className="col-sm-8 row">
              <div className="aboutUsSectionButton aboutUsSectionButtonActive">
                {" "}
                What we do?
              </div>
              <div className="aboutUsSectionButton aboutUsSectionButtonDisable">
                How it works?{" "}
              </div>
              <div className="aboutUsSectionButton aboutUsSectionButtonDisable">
                Become a partnar
              </div>
            </div>
          </div>
          <div className="row aboutSectionRow2">
            <div className="col-sm-6 showMobileBlock mobileVideo">
              <img src={videoThumbnail} className="videoThumbnail" />
              <div className="row">
                <div className="col-sm-3 row">
                  <div className="aboutSectionLeftArrow">
                    <FontAwesomeIcon icon={faArrowLeft} color="blue" />
                  </div>
                  <div className="aboutSectionLeftArrow">
                    <FontAwesomeIcon icon={faArrowRight} color="blue" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              {/* Card */}
              <div className="row">
                <div className="col-sm-3 text-center">
                  <img src={aboutsecimg1} />
                </div>
                <div className="col-sm-8">
                  <div className="aboutSectionRow2CardTitle">
                    Set up your wallet
                  </div>
                  <div className="aboutSectionRow2CardTagline">
                    Once you’ve set up your wallet of choice, connect it to our
                    site by clicking the wallet icon in the top right corner.{" "}
                  </div>
                </div>
              </div>
              {/* Card */}
              {/* Card */}
              <div className="row">
                <div className="col-sm-3 text-center">
                  <img src={aboutsecimg2} />
                </div>
                <div className="col-sm-8">
                  <div className="aboutSectionRow2CardTitle">
                    Create your collection
                  </div>
                  <div className="aboutSectionRow2CardTagline">
                    Click My Collections and set up your collection. Add social
                    links, a description, profile & banner images, and set a
                    secondary sales fee.
                  </div>
                </div>
              </div>
              {/* Card */}
              {/* Card */}
              <div className="row">
                <div className="col-sm-3 text-center">
                  <img src={aboutsecimg3} />
                </div>
                <div className="col-sm-8">
                  <div className="aboutSectionRow2CardTitle">Add your NFTs</div>
                  <div className="aboutSectionRow2CardTagline">
                    Upload your work (image, video, audio, or 3D art), add a
                    title and description, and customize your NFTs with
                    properties, and stats.
                  </div>
                </div>
              </div>
              {/* Card */}
              {/* Card */}
              <div className="row">
                <div className="col-sm-3 text-center">
                  <img src={aboutsecimg4} />
                </div>
                <div className="col-sm-8">
                  <div className="aboutSectionRow2CardTitle">
                    List them for sale
                  </div>
                  <div className="aboutSectionRow2CardTagline">
                    Choose between auctions, fixed-price listings, and
                    declining-price listings. You choose how you want to sell
                    your NFTs, and we help you sell them!
                  </div>
                </div>
              </div>
              {/* Card */}
            </div>
            <div className="col-sm-6 showDesk">
              <img src={videoThumbnail} className="videoThumbnail" />
              <div className="row">
                <div className="col-sm-3 row">
                  <div className="aboutSectionLeftArrow">
                    <FontAwesomeIcon icon={faArrowLeft} color="blue" />
                  </div>
                  <div className="aboutSectionLeftArrow">
                    <FontAwesomeIcon icon={faArrowRight} color="blue" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section 4 */}
      <div className="getStartedSection showDesk">
        <div className="container">
          <div className="aboutUsSectionTitle">Get Started</div>
          <div className="row getStartedSectionCardWrapper">
            <div className="col-sm-4 text-center">
              <div className="getStartedSectionCardImg">
                <img src={getStartedSectionCardImg1} />
              </div>
              <div className="getStartedSectionCardTitle">
                Upload your best and unique work
              </div>
              <div className="getStartedSectionCardTagline">
                Start upload your work by creating an <br />
                account and connect the crypto wallet.
              </div>
            </div>

            <div className="col-sm-4 text-center">
              <div className="getStartedSectionCardImg">
                <img src={getStartedSectionCardImg2} />
              </div>
              <div className="getStartedSectionCardTitle">
                Fill out product info & price
              </div>
              <div className="getStartedSectionCardTagline">
                Fill out the required info and set <br /> for pricing and buying
                option
              </div>
            </div>

            <div className="col-sm-4 text-center">
              <div className="getStartedSectionCardImg">
                <img src={getStartedSectionCardImg3} />
              </div>
              <div className="getStartedSectionCardTitle">
                Voila!, your product is on the radar
              </div>
              <div className="getStartedSectionCardTagline">
                Let we work on your products, just monitor
                <br /> the traffic on the dashboard and waiting for
                <br /> the income, then relax
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 getStratedBtnWrapper">
              <div className="getStratedBtn">Get Started</div>
            </div>
          </div>
        </div>
      </div>
      {/* Section 5 */}
      <div className="partnersSection">
        <div className="container">
          <div className="aboutUsSectionTitle ourPartnerTitle">
            Our Partners
          </div>
          <div className="row partnersCardWrapper">
            <div className="col-sm-2">
              <div className="partnersCard">
                <img src={partner1} className="partnersCardImg" />
              </div>
            </div>
            <div className="col-sm-2">
              <div className="partnersCard">
                <img src={partner2} className="partnersCardImg" />
              </div>
            </div>
            <div className="col-sm-2">
              <div className="partnersCard">
                <img src={partner3} className="partnersCardImg" />
              </div>
            </div>
            <div className="col-sm-2">
              <div className="partnersCard">
                <img src={partner4} className="partnersCardImg" />
              </div>
            </div>
            <div className="col-sm-2">
              <div className="partnersCard">
                <img src={partner5} className="partnersCardImg" />
              </div>
            </div>
          </div>
          <div className="row partnersCardWrapper">
            <div className="col-sm-2">
              <div className="partnersCard">
                <img src={partner5} className="partnersCardImg" />
              </div>
            </div>
            <div className="col-sm-2">
              <div className="partnersCard">
                <img src={partner4} className="partnersCardImg" />
              </div>
            </div>
            <div className="col-sm-2">
              <div className="partnersCard">
                <img src={partner3} className="partnersCardImg" />
              </div>
            </div>
            <div className="col-sm-2">
              <div className="partnersCard">
                <img src={partner2} className="partnersCardImg" />
              </div>
            </div>
            <div className="col-sm-2">
              <div className="partnersCard">
                <img src={partner1} className="partnersCardImg" />
              </div>
            </div>
          </div>
          <div className="row partnersCardWrapper">
            <div className="col-sm-2">
              <div className="partnersCard">
                <img src={partner5} className="partnersCardImg" />
              </div>
            </div>
            <div className="col-sm-2">
              <div className="partnersCard">
                <img src={partner1} className="partnersCardImg" />
              </div>
            </div>
            <div className="col-sm-2">
              <div className="partnersCard">
                <img src={partner4} className="partnersCardImg" />
              </div>
            </div>
            <div className="col-sm-2">
              <div className="partnersCard">
                <img src={partner3} className="partnersCardImg" />
              </div>
            </div>
            <div className="col-sm-2">
              <div className="partnersCard">
                <img src={partner2} className="partnersCardImg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section 5 */}
    </>
  );
};

export default HomeSection;
