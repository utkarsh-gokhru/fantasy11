import React, { useState } from 'react';
import { UserProvider } from './pages/user_context';
import './App.css';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Home from './pages/home';
import {Auth}  from './pages/auth';
import { CreateRecepie } from './pages/rules';
import { SaveRecepie } from './pages/winners';
import { Navbar } from './components/navbar';
import ContestPage from './pages/contest';
import TeamPage from './pages/team_page';
import MyMatches from './pages/mymatches';
import MyTeam from './pages/my_teams';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path = "/" element = {<Auth />}/>
            <Route path = "/home" element ={<Home />}/>
            <Route path = "/rules" element = {<CreateRecepie />}/>
            <Route path = "/savedrecepie" element ={<SaveRecepie />}/>
            <Route path=  "/contest" element ={<ContestPage />}/>
            <Route path = "/Winners" element ={<SaveRecepie />}/>
            <Route path = "/team_page" element ={<TeamPage />}/>
            <Route path = "/mymatches" element ={<MyMatches />}/>
            <Route path = "/my_teams" element ={<MyTeam />}/>
         </Routes>
        </Router>
    </div>
    </UserProvider>
  );
}

export default App;
