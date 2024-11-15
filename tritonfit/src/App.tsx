import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CreateAccount } from './components/createAccount';
import './App.css';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/createAccount/" element={<CreateAccount />} />
    </Routes>
  </Router>
  );
}

export default App;