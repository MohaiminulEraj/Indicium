import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import trendingImg1 from "../assets/images/trendingImg1.png"
import trendingImg2 from "../assets/images/trendingImg2.png"
import trendingImg3 from "../assets/images/trendingImg3.png"
import trendingImg4 from "../assets/images/trendingImg4.png"
import trendingImg5 from "../assets/images/trendingImg5.png"
import trendingImg6 from "../assets/images/trendingImg6.png"
import TrendingCard from "./components/TrendingCard";
const Trending = (props) => {
    return (
        <div className="trendingSection">
            <div className="container">
                <div className="row trending">
                    <div className="col-sm-8">
                        <div className="trendingTitle">Trending collection</div>
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
                <div className="trendingCardsRow row">
                    <TrendingCard thumbnail={trendingImg1} />
                    <TrendingCard thumbnail={trendingImg2} />
                    <TrendingCard thumbnail={trendingImg3} />
                </div>
                <div className="trendingCardsRow row">
                    <TrendingCard thumbnail={trendingImg4} />
                    <TrendingCard thumbnail={trendingImg5} />
                    <TrendingCard thumbnail={trendingImg6} />
                </div>
                <div className="trendingSecBtnWrapper">
                    <div className="trendingSecBtn">
                        MarketPlace
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trending;
