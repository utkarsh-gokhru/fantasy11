import React from 'react';
import ReactDOM from 'react-dom' ;
import { Component }  from 'react';
import './App.css';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Home from './pages/home';
import {Auth}  from './pages/auth';
import { CreateRecepie } from './pages/createrecepie';
import { SaveRecepie } from './pages/saverecepie';
import { Navbar } from './components/navbar';
import ContestPage from './pages/contest';
import TeamPage from './pages/team_page';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path = "/" element = {<Home />}/>
          <Route path = "/auth" element ={<Auth />}/>
          <Route path = "/rules" element = {<CreateRecepie />}/>
          <Route path = "/savedrecepie" element ={<SaveRecepie />}/>
          <Route path=  "/contest" element ={<ContestPage />}/>
          <Route path = "/Winners" element ={<SaveRecepie />}/>
          <Route path = "/team_page" element ={<TeamPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
