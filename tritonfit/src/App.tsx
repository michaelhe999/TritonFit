import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
  );
}

export default App;