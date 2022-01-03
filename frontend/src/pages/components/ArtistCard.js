import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const ArtistCard = (props) => {
  
  return (
    <div className="col-sm-3 artistCardCol">
      <div className="artistCard">
        <div className="artistCardCoverImgWrapper">
          <img src={props.cover} className="artistCardCoverImg" />
        </div>
        <div className="artistCardInfo">
          <div className="artistCardProfileContainer">
            <div className="artistCardProfileWrapper">
              <div className="artistCardProfileImgWrapper">
                <img src={props.profile} className="artistCardProfile" />
              </div>
              <div className="artistCardProfileDot"></div>
            </div>
          </div>

          <div className="artistCardInfoTitle">Wolfgang Slashhaut</div>
          <div className="artistCardInfoRow row">
            <div className="col-sm-4 text-center">
              <div className="artistCardInfoRowColTitle">Sales</div>
              <div className="artistCardInfoRowColTagline">
                <FontAwesomeIcon icon={faHome} />
                <span style={{ marginLeft: 10 }}>243</span>
              </div>
            </div>

            <div className="col-sm-4 text-center">
              <div className="artistCardInfoRowColTitle">Artworks</div>
              <div className="artistCardInfoRowColTagline">
                <FontAwesomeIcon icon={faHome} />
                <span style={{ marginLeft: 10 }}>43</span>
              </div>
            </div>

            <div className="col-sm-4 text-center">
              <div className="artistCardInfoRowColTitle">Earning</div>
              <div className="artistCardInfoRowColTagline">
                <FontAwesomeIcon icon={faHome} />
                <span style={{ marginLeft: 10 }}>8.0</span>
              </div>
            </div>
          </div>

          <div className="artistCardBtnWrapper">
            <div className="artistCardBtn">
              <div className="artistCardBtnWrapperLayer">View Gallery</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
