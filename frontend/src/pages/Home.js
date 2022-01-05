import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";
import "../styles/Responsive.css";
import tabImg1 from "../assets/images/tabImg1.png";
import tabImg2 from "../assets/images/tabImg2.png";
import tabImg3 from "../assets/images/tabImg3.png";
import tabImg4 from "../assets/images/tabImg4.png";
import tabImg5 from "../assets/images/tabImg5.png";
import Header from "./components/Header";
import SelectionTabs from "./components/SelectionTabs";
import Footer from "./components/Footer";
import HomeSection from "./components/HomeSection";
import Trending from "./Trending";
import Artist from "./Artist";
import PopularCollection from "./PopularCollection";
import SigninPopup from "./components/SigninPopup";
import SignUpPopup from "./components/SignUpPopup";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const Home = (props) => {
  const [activeSection, setActiveSection] = useState("home");
  const [showPopup, setShowPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  // const [user, setUser] = useState()

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  const firebaseConfig = {
    apiKey: "AIzaSyBwmB6BwxVg-FxBd7hvW1KO0VmtfFE9xHM",
    authDomain: "indicium-bce37.firebaseapp.com",
    projectId: "indicium-bce37",
    storageBucket: "indicium-bce37.appspot.com",
    messagingSenderId: "598300371729",
    appId: "1:598300371729:web:a121c99b872fba8ad4fab0",
    measurementId: "G-VKEGSVPE8T"
  };

  // useEffect(() => {
  //   const app = initializeApp(firebaseConfig);
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is signed in, see docs for a list of available properties
  //       const uid = user.uid;
  //       setUser(user)
  //     } else {
  //       // User is signed out
  //       console.log(user)
  //       setUser(null)
  //     }
  //   });
  // }, [])


  return (
    <div className="body">

      {/* Signup and register popups */}
      {showPopup &&
        <SigninPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      }
      {
        showSignupPopup &&
        <SignUpPopup showSignupPopup={showSignupPopup} setShowSignupPopup={setShowSignupPopup} />

      }
      {/* Signup and register popups */}

      {/* Section1 */}
      <Header user={user} onSigninClick={() => setShowPopup(!showPopup)} onSignupClick={() => setShowSignupPopup(!showSignupPopup)} />
      {/* Section2 */}

      <div className="selectionTabsWrapper">
        <div className="container">
          <div className="row selectionTabsMobileRow " style={{ justifyContent: "space-around" }}>
            <SelectionTabs
              img={tabImg1}
              title="Trending"
              onClick={() => setActiveSection("trending")}
              active={activeSection == "trending" ? 'selectionTabActive' : ''}
            />
            <SelectionTabs
              img={tabImg2}
              title="Top artist"
              onClick={() => setActiveSection("artist")}
              active={activeSection == "artist" ? 'selectionTabActive' : ''}
            />
            <SelectionTabs
              img={tabImg3}
              title="Popular collection"
              onClick={() => setActiveSection("popular")}
              active={activeSection == "popular" ? 'selectionTabActive' : ''}
            />
            <SelectionTabs
              img={tabImg4}
              title="Our partner"
              onClick={() => setActiveSection("home")}
              active={activeSection == "home" ? '' : ''}
            />
            <SelectionTabs
              img={tabImg5}
              title="Upcomming drops"
              onClick={() => setActiveSection("home")}
              active={activeSection == "home" ? '' : ''}
            />
          </div>
        </div>
      </div>

      {activeSection == "home" ? (
        <HomeSection />
      ) : (
        (activeSection == "artist" ?
          <Artist />
          : activeSection == "popular" ?
            <PopularCollection />
            : activeSection == "trending" ?
              <Trending />
              : <HomeSection />)
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
