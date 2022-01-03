import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import profile from "../../assets/images/profile.png"
const TrendingCard = (props) => {
    return (
        <div className="col-sm-4" onClick={props.onClick}>
            <div className="trendingCardWrapper">
                <div className="trendingCardThumbnail">
                    <img src={props?.thumbnail} className="trendingCardThumbnailImg" />
                </div>
                <div className="trendingCardExtraLayer"></div>
                <div className="trendingCardInfoWrapper">
                    <div className="row trendingCardInfoWrapperRow">
                        <div className="col-sm-8">
                            <div className="trendingCardInfoWrapperRow1Col1">
                                Trending<br /> Collection
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="trendingCardInfoWrapperRow1Col2">
                                <div className="trednginCardProfile">
                                    <div className="profileWrapper">
                                        <img src={profile} className="trednginCardProfileImg" />
                                    </div>
                                    <div className="profileOnlineDot"></div>
                                </div>
                                <span className="showDesk">Dustin Houston</span>
                            </div>
                        </div>
                    </div>
                    <div className="row2Divider"></div>
                    <div className="row trendingCardInfoWrapperRow">
                        <div className="col-sm-8">
                            <div className="trendingCardInfoWrapperRow2Col1">
                                Current bid<br />
                                4.40 ETH
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="trendingCardInfoWrapperRow2Col1">
                                Ending drops<br />
                                2h 59m 35s
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default TrendingCard;
