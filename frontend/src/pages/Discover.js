import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";
import "../styles/Responsive.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CustomNavbar from "./components/CustomNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSpinner } from "@fortawesome/free-solid-svg-icons";
import DiscoverCard from "./components/DiscoverCard";
import discoverCardThumbnail1 from "../assets/images/discoverCardThumbnail1.png";
import discoverCardThumbnail2 from "../assets/images/discoverCardThumbnail2.png";
import discoverCardThumbnail3 from "../assets/images/discoverCardThumbnail3.png";
import discoverCardThumbnail4 from "../assets/images/discoverCardThumbnail4.png";
import SigninPopup from "./components/SigninPopup";
import SignUpPopup from "./components/SignUpPopup";
const Discover = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
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
        <CustomNavbar onSigninClick={() => setShowPopup(!showPopup)} onSignupClick={() => setShowSignupPopup(!showSignupPopup)}  />
      </div>

      <div className="discoverSection">
        <div className="container">
          <div className="row discoverTitleWrapper">
            <div className="col-sm-12">
              <div className="trendingTitle">Discover</div>
            </div>
          </div>

          <div className="row discoverHeadBar">
            <div className="col-sm-4">
              <div className="trendingDateWrapper">
                <div className="trendingDateText" style={{ color: "#6B6F77" }}>
                  Recently added
                </div>
                <a href="#" className="trendingDateArrow">
                  <FontAwesomeIcon icon={faChevronDown} color="white" />
                </a>
              </div>
              <div className="trendingDateWrapper showMobile">
                <div className="trendingDateText" style={{ color: "#6B6F77" }}>
                  All items
                </div>
                <a href="#" className="trendingDateArrow">
                  <FontAwesomeIcon icon={faChevronDown} color="white" />
                </a>
              </div>
            </div>

            <div className="col-sm-6 showDesk">
              <div className="discoverHeadBarMenu row">
                <div className="col-sm-2">
                  <div className="discoverHeadBarItem discoverHeadBarItemActive">
                    All items
                  </div>
                </div>

                <div className="col-sm-2">
                  <div className="discoverHeadBarItem">Art</div>
                </div>
                <div className="col-sm-2">
                  <div className="discoverHeadBarItem">Game</div>
                </div>
                <div className="col-sm-2">
                  <div className="discoverHeadBarItem">Photography</div>
                </div>
                <div className="col-sm-2">
                  <div className="discoverHeadBarItem">Others</div>
                </div>
              </div>
            </div>

            <div className="col-sm-1">
              <div className="dicoverHeadBarFilterButtonWrapper">
                <div className="dicoverHeadBarFilterButton showDeskFlex">
                  Filter
                  <span style={{ marginLeft: 10 }}>X</span>
                </div>
                <div className="dicoverHeadBarFilterButton showMobile">Advance Filter</div>
              </div>
            </div>
          </div>

          <div className="row filterActions showDeskFlex">
            <div className="col-sm-3">
              <div className="filterActionTitle">PRICE</div>
              <div className="trendingDateWrapper2 ">
                <div className="trendingDateText" style={{ color: "#6B6F77" }}>
                  Highest price
                </div>
                <a href="#" className="trendingDateArrow">
                  <FontAwesomeIcon icon={faChevronDown} color="white" />
                </a>
              </div>
            </div>

            <div className="col-sm-3">
              <div className="filterActionTitle">LIKES</div>
              <div className="trendingDateWrapper2 ">
                <div className="trendingDateText" style={{ color: "#6B6F77" }}>
                  Most liked
                </div>
                <a href="#" className="trendingDateArrow">
                  <FontAwesomeIcon icon={faChevronDown} color="white" />
                </a>
              </div>
            </div>

            <div className="col-sm-3">
              <div className="filterActionTitle">CREATOR</div>
              <div className="trendingDateWrapper2 ">
                <div className="trendingDateText" style={{ color: "#6B6F77" }}>
                  Verified only
                </div>
                <a href="#" className="trendingDateArrow">
                  <FontAwesomeIcon icon={faChevronDown} color="white" />
                </a>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="filterActionTitle">PRICE RANGE</div>
            </div>
          </div>

          <div className="row discoverCardWrapper">
            <DiscoverCard thumbnail={discoverCardThumbnail1} />
            <DiscoverCard thumbnail={discoverCardThumbnail2} />
            <DiscoverCard thumbnail={discoverCardThumbnail3} />
            <DiscoverCard thumbnail={discoverCardThumbnail4} />
          </div>
          <div className="row discoverCardWrapper">
            <DiscoverCard thumbnail={discoverCardThumbnail4} />
            <DiscoverCard thumbnail={discoverCardThumbnail2} />
            <DiscoverCard thumbnail={discoverCardThumbnail3} />
            <DiscoverCard thumbnail={discoverCardThumbnail1} />
          </div>

          <div className="trendingSecBtnWrapper">
            <div className="trendingSecBtn">
              Load more
              <FontAwesomeIcon icon={faSpinner} style={{ marginLeft: 10 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Discover;
