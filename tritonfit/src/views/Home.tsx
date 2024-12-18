import React from "react";
import "./Home.css";
import ThisWeek from "../components/Homepage/ThisWeek";
import Hours from "../components/Homepage/Hours";

import Notification from "../assets/notification-button.svg";
import Trends from "../assets/trends.svg";
import { useUserData } from '../hooks/useUserData';

const Home: React.FC = () => {

  const { userData: specificData } = useUserData(['name', 'email', 'picture']);
  const user = specificData?.name || 'Michael';

  const hoursData: { [day: string]: number } = {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  };

  const completedDays = Object.keys(hoursData).filter(
    (day) => hoursData[day] > 0
  );

  const totalHours = Object.values(hoursData).reduce(
    (sum, hours) => sum + hours,
    0
  );

  return (
    <div className="container">
      <header className="header">
        <h1>Welcome {user}</h1>
        {/* <div className="header-icons"> */}
          {/* <button
            className="header-button"
            onClick={() => alert("Trends icon clicked!")}
            aria-label="Trends"
          >
            <img src={Trends} alt="" />
          </button> */}

          {/* <button
            className="header-button"
            onClick={() => alert("Notification icon clicked!")}
            aria-label="Notification"
          >
            <img src={Notification} alt="" /> */}
          {/* </button> */}
        {/* </div> */}
      </header>

      <div className="section">
        <ThisWeek completedDays={completedDays} />
      </div>

      <div className="section">
        <Hours hoursData={hoursData} totalHours={totalHours} />
      </div>
    </div>
  );
};

export default Home;
