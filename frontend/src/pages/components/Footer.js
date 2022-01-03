import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Home.css";
import "../../styles/Responsive.css";
import cube from "../../assets/images/cube.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const Footer = (props) => {
  return (
    <div className="Footer">
      <div className="Footerdivider"></div>
      <div className="container footerContainer">
        <div className="row">
          <div className="col-sm-4">
            <div className="footerTitile">Indicium</div>
            <div className="footercol1Text">
              The New Creative <br className="deskBr" />
              Economy.
            </div>
          </div>
          <div className="col-sm-2">
            <div className="footerMidColTitle">Stacks</div>
            <div className="footerMidColItemText">
              <a href="#">Discover</a>
            </div>
            <div className="footerMidColItemText">
              <a href="#">Connect Wallet</a>
            </div>
            <div className="footerMidColItemText">
              <a href="#">Create item</a>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="footerMidColTitle">Info</div>
            <div className="footerMidColItemText">
              <a href="#">Download</a>
            </div>
            <div className="footerMidColItemText">
              <a href="#">Demos</a>
            </div>
            <div className="footerMidColItemText">
              <a href="#">Support</a>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="footerMidColTitle">Join Newsletter</div>
            <div className="footerMidColItemText2">
              <a href="#">
                Subscribe our newsletter to get more free design <br />
                course and resource
              </a>
            </div>
            <div className="footerEmailInputWrapper">
              <input
                placeholder="Enter your email"
                className="footerEmailInput col-sm-11"
              />
              <div className="footerArrowBtn">
                <FontAwesomeIcon icon={faArrowRight} color="white" />
              </div>
            </div>
          </div>
        </div>
        <div className="footerDividerContainer"></div>

        <div className="footerEnd">
          <div className="footerEndText1">
            Copyright © 2021 Indicium. All rights reserved
          </div>
          <div className="footerEndText2">
            We use cookies for better service.
            <span className="footerEndText2Accept">
              {" "}
              <a href="#">Accept</a>
            </span>
          </div>
        </div>
      </div>
      <div className="cubeFooterImage showDesk">
        <img src={cube} />
      </div>
    </div>
  );
};

export default Footer;
