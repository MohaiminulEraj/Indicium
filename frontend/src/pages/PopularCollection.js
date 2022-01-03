import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import PopularCard from "./components/PopularCard";
import popularCardThumbnail1 from "../assets/images/popularCardThumbnail1.png";
import popularCardThumbnail2 from "../assets/images/popularCardThumbnail2.png";
import popularCardThumbnail3 from "../assets/images/popularCardThumbnail3.png";
const PopularCollection = (props) => {
  return (
    <div className="popularSection">
      <div className="container">
        {/* Header */}
        <div className="row trending" style={{ marginBottom: 40 }}>
          <div className="col-sm-8">
            <div className="trendingTitle">Popular collection</div>
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
        <div className="row popularCollectioContainer">
          <PopularCard thumbnail={popularCardThumbnail1} />
          <PopularCard thumbnail={popularCardThumbnail2} />
          <PopularCard thumbnail={popularCardThumbnail3} />
        </div>
        <div className="row popularCollectioContainer">
          <PopularCard thumbnail={popularCardThumbnail3} />
          <PopularCard thumbnail={popularCardThumbnail2} />
          <PopularCard thumbnail={popularCardThumbnail1} />
        </div>

        <div className="trendingSecBtnWrapper">
          <div className="trendingSecBtn">MarketPlace</div>
        </div>
      </div>
    </div>
  );
};

export default PopularCollection;
