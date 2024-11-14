import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Home from "./components/Home";
import { FindAWorkout } from "./views/FindAWorkout";
import MeetOthers from "./components/MeetOthers";
import Profile from "./components/Profile";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/findworkout" element={<FindAWorkout />} />
          <Route path="/meetothers" element={<MeetOthers />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>

      <Navbar />
    </Router>
  );
};

export default App;


/**
 * import React, { useEffect, useState } from 'react';
import { generateWorkout } from './utils/workoutGenerator-utils';
import { WorkoutFormResponses, WorkoutList } from './types/workout';
const sampleResponse: WorkoutFormResponses = {
  gender: 'female',
  goal: 'full body',
  targetArea: 'back',
  level: 'intermediate',
  duration: '60'
}

async function test() {
  const response = await generateWorkout(sampleResponse);
  return response;
}

function App() {
  // Define a state variable to store the resolved response
  const [workout, setWorkout] = useState<WorkoutList>();

  useEffect(() => {
    // Call the async function inside useEffect to avoid calling it directly in the component body
    test().then(response => {
      setWorkout(response);  // Store the resolved response in state
    });
  }, []);

  return (
    <div>
      {workout ? <pre>{JSON.stringify(workout, null, 2)}</pre> : 'Loading...'}
    </div>
  );
}

export default App;

 */