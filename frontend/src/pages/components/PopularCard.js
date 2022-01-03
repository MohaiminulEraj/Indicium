import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PopularCard = (props) => {

    return (
        <div className="col-sm-4 popularArtistCardCol">
            <div className="popularCardThumbnailWrapper">
                <img src={props.thumbnail} className="popularCardThumbnailImg" />
            </div>
            <div className="row popularCardImages">
                <div className="col-sm-4 popularCardSubImageWrapper">
                    <img src={props.thumbnail} className="popularCardSubImage" />
                </div>
                <div className="col-sm-4 popularCardSubImageWrapper">
                    <img src={props.thumbnail} className="popularCardSubImage" />
                </div>
                <div className="col-sm-4 popularCardSubImageWrapper">
                    <img src={props.thumbnail} className="popularCardSubImage" />
                </div>
            </div>
            <div className="popularCardTitle">Awesome Collection</div>
            <div className="row">
                <div className="popularCardlastRow">
                    <div className="popularCardLastRowProfile col-sm-1">
                        <img src={props.thumbnail} className="popularCardSubImage" />
                    </div>
                    <div className="col-sm-8 popularCardLastRowTitle">By Tyrese Littel</div>
                    <div className="col-sm-2 popularCardLastRowButtonWrapper">
                        <div className="popularCardLastRowButton">
                            28 ITEMS
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularCard;
