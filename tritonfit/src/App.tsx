import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Home from "./components/Home";
import { FindAWorkout } from "./views/FindAWorkout";
import MeetOthers from "./components/MeetOthers";
import Profile from "./components/Profile";
import { SignIn } from "./components/signIn";
import { CreateAccount } from "./components/createAccount";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/findworkout" element={<FindAWorkout />} />
          <Route path="/meetothers" element={<MeetOthers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/createaccount" element={<CreateAccount />} />

        </Routes>
      </div>

      <Navbar />
    </Router>
  );
};

export default App;