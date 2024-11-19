import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { SignIn } from './components/signIn';
import { CreateAccount } from './components/createAccount';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/createAccount/" element={<CreateAccount />} />
      <Route path="/signIn/" element={<SignIn />} />
    </Routes>
  </Router>
  );
}

export default App;