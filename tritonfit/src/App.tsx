import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import { CreateWorkout } from './views/CreateWorkout'

function App() {
  return (
  <Router>
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/createWorkout" element={<CreateWorkout />} />
    </Routes>
  </Router>
  );
}

export default App;