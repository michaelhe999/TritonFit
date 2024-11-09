import React from "react";
import "./Hours.css";

interface HoursProps {
  hoursData: { [day: string]: number };
  totalHours: number;
}

function Hours({ hoursData, totalHours }: HoursProps) {
  const maxHours = Math.max(...Object.values(hoursData)) || 1;

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Hours</h2>
        <p className="section-subtitle">{totalHours} hours</p>
      </div>

      <div className="bars-container">
        {Object.keys(hoursData).map((day) => (
          <div key={day} className="bar-container">
            <div
              className={`bar ${hoursData[day] > 0 ? "active" : "inactive"}`}
              style={{ height: `${(hoursData[day] / maxHours) * 100}%` }}
            >
              {hoursData[day] > 0 && (
                <span className="hours-label">{hoursData[day]}hr</span>
              )}
            </div>
            <span className="day-label">{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hours;
