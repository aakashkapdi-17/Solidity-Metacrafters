import React from "react";
import "./Navbar.css";
import { Web3Button } from "@web3modal/react";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="outerDiv">
        <h2 className="title">Wallet Connection using Web3Modal</h2>
        <Web3Button />
      </div>
    </div>
  );
};

export default Navbar;
