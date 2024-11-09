import React from "react";
import "./ThisWeek.css";

import checked from "../../assets/yellow-check.svg";
import unchecked from "../../assets/grey-check.svg";

interface ThisWeekProps {
  completedDays: string[];
}

function ThisWeek({ completedDays }: ThisWeekProps) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">This Week</h2>
        <p className="section-subtitle">{completedDays.length}/7 Days</p>
      </div>
      <div className="days-container">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className={`day ${completedDays.includes(day) ? "completed" : ""}`}
          >
            {day}
            {completedDays.includes(day) ? (
              <img src={checked} alt="Completed Checkmark" />
            ) : (
              <img src={unchecked} alt="Grey Checkmark" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThisWeek;
