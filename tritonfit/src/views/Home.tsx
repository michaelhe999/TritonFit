import React from "react";
import "./Home.css";
import ThisWeek from "../components/Homepage/ThisWeek";
import Hours from "../components/Homepage/Hours";

import Notification from "../assets/notification-button.svg";
import Trends from "../assets/trends.svg";

const Home: React.FC = () => {
  const hoursData: { [day: string]: number } = {
    Sun: 5,
    Mon: 2,
    Tue: 3,
    Wed: 0,
    Thu: 5,
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
        <h1>Welcome Jane</h1>
        <div className="header-icons">
          <img src={Trends} alt="" />
          <img src={Notification} alt="" />
        </div>
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
