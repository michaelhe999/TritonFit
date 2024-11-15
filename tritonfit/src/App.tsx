import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { CreateAccount } from './components/createAccount';
=======
import { CreateAccount } from './createAccount';
>>>>>>> 73ec970fa3081357c1f6e108e6cab9420921309a
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