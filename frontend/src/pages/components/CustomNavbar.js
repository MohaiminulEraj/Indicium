import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import "../../styles/Nav.css";
import logo from "../../assets/images/logo.png";
import bell from "../../assets/images/bell.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import mobileLogo from "../../assets/images/mobileLogo.png"
import { logout } from "../../redux/actions/userActions";
const CustomNavbar = (props) => {

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div className="container navCont">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/home">
              <div>
                <img className="logo" src={logo} />
              </div>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">
                <div className="navItem">
                  <Link to="/discover">Discover</Link>
                </div>
              </Nav.Link>
              <Nav.Link href="#link">
                <div className="navItem">How it works</div>
              </Nav.Link>
              <Nav.Link>
                <div className="searchBar">
                  <div className="row searchBarRow">
                    <div className="col-11">
                      <input type="text" placeholder="Search here" className="inputField"
                        style={{ fontSize: 12, }}
                      />
                    </div>
                    <div className="col-1">
                      <FontAwesomeIcon
                        icon={faSearch}
                        color="white"
                        style={{ fontSize: 14 }}
                      />
                    </div>
                  </div>
                </div>
              </Nav.Link>
              <Nav.Link href="#home">
                <div className="bellIconWrapper">
                  <img className="bellIcon" src={bell} />
                  <div className="bellIconCricle"></div>
                </div>
              </Nav.Link>
              {userInfo == null ?
                <>
                  <Nav.Link href="#">
                    <div className="navItemSignup" onClick={() => props.onSignupClick()}>Signup</div>
                  </Nav.Link>
                  <Nav.Link href="#" >
                    <div className="navLoginBtn" onClick={() => props.onSigninClick()}>
                      <FontAwesomeIcon
                        icon={faUserAlt}
                        color="white"
                        className="navLoginBtnTextIcon"
                      />
                      <div className="navLoginBtnText">Login</div>
                    </div>
                  </Nav.Link>
                </>
                :
                <>
                  <Nav.Link>
                    <div className="navItemSignup">
                      <Link to="/update-profile">Welcome {user ? user.name : 'User'}!</Link>
                    </div>
                  </Nav.Link>
                  <Nav.Link href="#" >
                    <div className="navLoginBtn" onClick={logoutHandler}>
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        color="white"
                        className="navLoginBtnTextIcon"
                      />
                      <div className="navLoginBtnText">Logout</div>
                    </div>
                  </Nav.Link>
                </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
