import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import DecisionForm from './components/DecisionForm';
import LandingPage from './components/LandingPage';
import './styles/global.css';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return !user ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Page (Standalone) */}
        <Route path="/" element={<LandingPage />} />

        {/* App Layout Routes */}
        <Route element={<Layout />}>
          {/* Public Demo Route */}
          <Route path="demo" element={<Dashboard demo={true} />} />

          <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="new" element={<ProtectedRoute><DecisionForm /></ProtectedRoute>} />
          <Route path="login" element={<PublicRoute><Auth isSignup={false} /></PublicRoute>} />
          <Route path="register" element={<PublicRoute><Auth isSignup={true} /></PublicRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
