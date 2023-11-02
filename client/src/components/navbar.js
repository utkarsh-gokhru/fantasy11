import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const  Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.setItem("loggedIn","false");
        localStorage.setItem("username","");
        navigate("/");  
    }

    return(
    <div className="navbar">
        <Link to = "home">Home </Link>
        <Link to = "rules">Rules </Link>
        <Link to = "winners">Winners </Link> 
        <Link to = "mymatches">My Matches </Link> 
        <Link to = "/" onClick={handleLogout}>Logout </Link> 
    </div>)
 }
