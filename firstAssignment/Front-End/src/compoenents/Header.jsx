import React from "react";

function Header({ connectionHandler, isConnected, setIsselctorActive, chain }) {
  const selectChainImage = () => {
    if (chain == "eth") {
      return "ethereum.png";
    } else if (chain == "bsc") {
      return "binance-smart-chain.svg";
    }
    return "polygan.png";
  };

  return (
    <div className="header">
      {/* logo */}
      <div className="header__logo">
        <img src="/logo.svg" className="logo" alt="" />
        <p className="logotype">Alpha Vault</p>
      </div>

      {/* buttons for connecting and disconnecting wallet */}
      <div className="button__container">
        {/* button for selecting chain */}
        <button
          type="select"
          onClick={() => {
            setIsselctorActive(true);
          }}
          className="chainBTN"
        >
          <p className="chain__text">chain</p>
          <img src={selectChainImage()} className="chain__image" alt="" />
        </button>

        {/* button for connecting and disconnecting to the wallet */}
        <button
          onClick={connectionHandler}
          className="header__button connectBTN"
        >
          <p className="connect__text">
            {isConnected ? "disconnect wallet" : "connect wallet"}
          </p>

          <img src="/metamask-seeklogo.com.svg" alt="s" />
        </button>
      </div>
    </div>
  );
}

export default Header;
