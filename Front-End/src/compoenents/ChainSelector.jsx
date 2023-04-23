import React, { Component } from "react";
function ChainSelector({ setChain, setIsselctorActive }) {
  return (
    // chaine selector component
    <div className="selector ">
      <div className="selector__inside">
        {/* chains */}
        <img
          src="/ethereum.png"
          onClick={() => {
            setChain("eth");
            setIsselctorActive(false);
          }}
          alt="eth"
        />
        <img
          src="/binance-smart-chain.svg"
          onClick={() => {
            setChain("bsc");
            setIsselctorActive(false);
          }}
          alt=""
        />
        <img
          src="/polygan.png"
          alt=""
          onClick={() => {
            setChain("poly");
            setIsselctorActive(false);
          }}
        />
      </div>
    </div>
  );
}

export default ChainSelector;
