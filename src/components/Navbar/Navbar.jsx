import React from 'react'
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { 

    user, handleLogout
  }  = useContext(AppContext)



  return (
    <nav>
      <Link to="/" className="nav__projectName">
        <h1 className='snitch'>foodSnitch</h1>
      </Link>

      <div className="nav__authLinks">
        {user ? (

          
          <>
          
       
           <Link to="/recipes" className="authLink">
              all recipes
            </Link>
            <Link to="/myrecipes" className="authLink">my recipes</Link>
            <Link to="/randomrecipes" className="authLink">random recipes
            </Link>
            <button className="nav-logoutbtn" onClick={handleLogout}>
              logout
            </button>
          </>
        ) : (
          <>
   
            <Link to="/recipes" className="authLink">
              your recipes
            </Link>
            <Link to="/signin" className="authLink">
              log in
            </Link>
            <Link to= "/signup" className="authLink">
              sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
