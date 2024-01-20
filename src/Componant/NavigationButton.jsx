import React from "react";
import "../styles/NavigationButtons.css";
import { Link } from "react-router-dom";
import AddClient from "./AddClient";
const NavigationButtons = ({ onAddClient }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to={"/"} className="brand">
          Fitness Trainer
        </Link>
      </div>
      <div className="navbar-right">
        <Link to={"/"} className="nav-link">
          Home
        </Link>
        <Link to={"/calendar"} className="nav-link">
          Calendar
        </Link>
        <div className="nav-link">
          <AddClient onAddClient={onAddClient} />
        </div>
      </div>
    </nav>
  );
};

export default NavigationButtons;
