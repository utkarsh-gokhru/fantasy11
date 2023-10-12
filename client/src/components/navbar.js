import React from "react";
import { Link } from "react-router-dom";

export const  Navbar = () => {
    return(
    <div className="navbar">
        <Link to = "/">Home </Link>
        <Link to = "createrecepie">CreateRecepie </Link>
        <Link to = "savedrecipe">SaveRecepie </Link>
        <Link to = "auth">Login/Register </Link>

    </div>)
 }
 