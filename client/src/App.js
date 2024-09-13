import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/home';
import { Auth } from './pages/auth';
import { CreateRecepie } from './pages/rules';
import { SaveRecepie } from './pages/winners';
import { Navbar } from './components/navbar';
import ContestPage from './pages/contest';
import TeamPage from './pages/team_page';
import MyMatches from './pages/mymatches';
import MyTeam from './pages/my_teams';
import Matches from './components/matches';
import "../src/global.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="YOUR_ACTUAL_GOOGLE_CLIENT_ID">
      <Router>
        <NavbarWithConditionalRendering />
        <div className="App">
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Matches/>} />
            <Route path="/rules" element={<CreateRecepie />} />
            <Route path="/savedrecepie" element={<SaveRecepie />} />
            <Route path="/contest" element={<ContestPage />} />
            <Route path="/winners" element={<SaveRecepie />} />
            <Route path="/team_page" element={<TeamPage />} />
            <Route path="/mymatches" element={<MyMatches />} />
            <Route path="/my_teams" element={<MyTeam />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="*" element={<Navigate to="/" />} /> {/* Fallback route */}
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

function NavbarWithConditionalRendering() {
  const location = useLocation();
  const hideNavbarPaths = ['/']; // Paths where the Navbar should not be shown
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  if (showNavbar) {
    return <Navbar />;
  }
  return null;
}

export default App;
