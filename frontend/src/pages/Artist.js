import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import ArtistCard from "./components/ArtistCard";
import artistCardImg1 from "../assets/images/artistCardImg1.png";
import artistCardImg2 from "../assets/images/artistCardImg2.png";
import artistCardImg3 from "../assets/images/artistCardImg3.png";
import artistCardImg4 from "../assets/images/artistCardImg4.png";
import artistCardProfile2 from "../assets/images/artistCardProfile2.png";
import artistCardProfile1 from "../assets/images/artistCardProfile1.png";
import artistCardProfile3 from "../assets/images/artistCardProfile3.png";
const Artist = (props) => {
  return (
    <div className="artistSection">
      <div className="container">
        {/* Header */}
        <div className="row trending">
          <div className="col-sm-8">
            <div className="trendingTitle">Top Artist</div>
          </div>
          <div className="col-sm-4 secHeadDateCol showDesk">
            <div className="trendingDateWrapper ">
              <div className="trendingDateText">Today</div>
              <a href="#" className="trendingDateArrow">
                <FontAwesomeIcon icon={faChevronDown} color="white" />
              </a>
            </div>
          </div>
        </div>
        {/* Header */}
        <div className="row artistCardRow">
          <ArtistCard cover={artistCardImg1} profile={artistCardProfile1} />
          <ArtistCard cover={artistCardImg2} profile={artistCardProfile3} />
          <ArtistCard cover={artistCardImg3} profile={artistCardProfile2} />
          <ArtistCard cover={artistCardImg4} profile={artistCardProfile3} />
        </div>
        <div className="row artistCardRow">
          <ArtistCard cover={artistCardImg1} profile={artistCardProfile1} />
          <ArtistCard cover={artistCardImg2} profile={artistCardProfile3} />
          <ArtistCard cover={artistCardImg3} profile={artistCardProfile2} />
          <ArtistCard cover={artistCardImg4} profile={artistCardProfile3} />
        </div>
        {/* Artist ends here */}
        <div className="trendingSecBtnWrapper">
          <div className="trendingSecBtn">MarketPlace</div>
        </div>
      </div>
    </div>
  );
};

export default Artist;
