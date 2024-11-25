import React, { useState } from "react";
import "./MeetOthers.css";
import PeopleGrid from "../components/MeetOthers/PeopleGrid";
import ProfileView from "../components/MeetOthers/ProfileView";

import leslie from "../assets/people/leslie.svg";
import reagan from "../assets/people/reagan.svg";
import hadley from "../assets/people/hadley.svg";
import jessica from "../assets/people/jessica.svg";
import sarah from "../assets/people/sarah.svg";

const MeetOthers: React.FC = () => {
  const users = [
    {
      name: "Leslie",
      image: leslie,
      major: "Biology, 3rd Year",
      experience:
        "I am new to working out with weights! Looking for someone to learn together with!",
      about:
        "Hi, I'm Leslie! I'm from Revelle College and enjoy reading, going to the beach, and staying active!",
      email: "leslie@ucsd.edu",
    },
    {
      name: "Reagan",
      image: reagan,
      major: "Computer Science, 2nd Year",
      experience: "I enjoy running and yoga but want to try strength training!",
      about:
        "My name is Reagan, and I love hiking and coding! Hoping to find like-minded gym partners.",
      email: "reagan@ucsd.edu",
    },
    {
      name: "Hadley",
      image: hadley,
      major: "Psychology, 4th Year",
      experience:
        "I’ve been weight training for a year and love it. Happy to share tips!",
      about:
        "Hello, I’m Hadley. I’m into fitness and mindfulness activities. Let’s connect at the gym!",
      email: "hadley@ucsd.edu",
    },
    {
      name: "Jessica",
      image: jessica,
      major: "Chemistry, 1st Year",
      experience: "Brand new to the gym world and open to learning anything!",
      about:
        "Hey, I’m Jessica! I love exploring campus activities and want to stay fit this year.",
      email: "jessica@ucsd.edu",
    },
    {
      name: "Sarah",
      image: sarah,
      major: "Economics, 2nd Year",
      experience: "Mostly a swimmer but looking to try out weightlifting.",
      about:
        "I’m Sarah, an economics major who loves surfing and swimming. Let’s meet up!",
      email: "sarah@ucsd.edu",
    },
  ];

  const [selectedUser, setSelectedUser] = useState(null);

  const handleCardClick = (user: any) => {
    setSelectedUser(user);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  return (
    <div className="container">
      {!selectedUser ? (
        <>
          <h1 className="title">Meet Others</h1>
          <p className="subtitle">
            Meet other UCSD students who are also looking to hit the gym and stay
            active!
          </p>
          <PeopleGrid users={users} onCardClick={handleCardClick} />
        </>
      ) : (
        <ProfileView user={selectedUser} onBackClick={handleBackClick} />
      )}
    </div>
  );
};

export default MeetOthers;
