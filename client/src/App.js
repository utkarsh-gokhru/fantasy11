import React from 'react';
import ReactDOM from 'react-dom' ;
import { Component }  from 'react';
import './App.css';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import { Home} from './pages/home';
import {Auth}  from './pages/auth';
import { CreateRecepie } from './pages/createrecepie';
import { SaveRecepie } from './pages/saverecepie';
import { Navbar } from './components/navbar';


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path = "/" element = {<Home />}/>
          <Route path = "/auth" element ={<Auth />}/>
          <Route path = "/rules" element = {<CreateRecepie />}/>
          <Route path = "/Winners" element ={<SaveRecepie />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
