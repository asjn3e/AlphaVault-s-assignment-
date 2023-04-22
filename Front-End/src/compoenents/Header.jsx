import React, { Component } from "react";
import { useState } from "react";

function Header() {
  return (
    <div className="header">
      {/* logo */}
      <div className="header__logo"> 
        <img src="/logo.svg" className="logo" alt="" />
        <p className="logotype">Alpha Vault</p>
      </div>
      {/* buttons for connecting and disconnecting wallet */}
      <div className="button__container"> 

        <button type="select" className="chainBTN">
          <p className="chain__text">chain</p>
          <img src="/eth_logo.svg" className="chain__image" alt="" />
        </button>
        <button className="header__button connectBTN">
          <p className="connect__text">Connect wallet</p>
          
          <img src="/metamask-seeklogo.com.svg" alt="s" />
        </button>
      </div>
    </div>
  );
}

export default Header;
