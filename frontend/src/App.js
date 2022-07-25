import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import DiscoverRoute from "./routes/landing-pages/DiscoverRoute";
import CreateNftRoute from "./routes/landing-pages/CreateNftRoute";
import DiscoverRouteSingle from "./routes/landing-pages/DiscoverSingleRoute";
import HomeRoute from "./routes/landing-pages/HomeRoute";
import ProfileRoute from "./routes/landing-pages/ProfileRoute";
import SignupRoute from "./routes/landing-pages/SignupRoute";
import SigninRoute from "./routes/landing-pages/SigninRoute";
import UpdateProfileRoute from "./routes/landing-pages/UpdateProfileRoute";
import ForgotPassRoute from "./routes/landing-pages/ForgotPassRoute";
import NewPassRoute from "./routes/landing-pages/NewPassRoute";
import VerifyEmailRoute from "./routes/landing-pages/VerifyEmailRoute";
import PrivateRoute from "./pages/components/routing/PrivateRoute";
//import * as firebase from "firebase"

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/discover" element={<DiscoverRoute />} />
        <Route path="/discoverSingle/:id" element={<DiscoverRouteSingle />} />
        <Route path="/create" element={<PrivateRoute component={CreateNftRoute} />} />
        <Route path="/profile" element={<PrivateRoute component={ProfileRoute} />} />
        <Route path="/signin" element={<SigninRoute />} />
        <Route path="/signup" element={<SignupRoute />} />
        <Route path="/home" element={<HomeRoute />} />
        <Route path="/update-profile" element={<PrivateRoute component={UpdateProfileRoute} />} />
        <Route path="/forgot-password" element={<ForgotPassRoute />} />
        <Route path="/reset-password" element={<NewPassRoute />} />
        <Route path="/verify-email" element={<VerifyEmailRoute />} />
        <Route path="/" element={<HomeRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
