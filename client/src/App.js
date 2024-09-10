import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

function App() {
  return (
      <div className="App">
        <Router>
          <NavbarWithConditionalRendering />
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Matches />} />
            <Route path="/rules" element={<CreateRecepie />} />
            <Route path="/savedrecepie" element={<SaveRecepie />} />
            <Route path="/contest" element={<ContestPage />} />
            <Route path="/Winners" element={<SaveRecepie />} />
            <Route path="/team_page" element={<TeamPage />} />
            <Route path="/mymatches" element={<MyMatches />} />
            <Route path="/my_teams" element={<MyTeam />} />
            <Route path="/matches" element={<Matches />} />
          </Routes>
        </Router>
      </div>
  );
}

function NavbarWithConditionalRendering() {
  const location = useLocation();
  const showNavbar = !['/'].includes(location.pathname);

  if (showNavbar) {
    return <Navbar />;
  }
  return null;
}

export default App;
