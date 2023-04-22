import React, { Component } from "react";
function ChainSelector() {
  return (
    // chaine selector component
    <div className="selector ">
      <div className="selector__inside">
        {/* chains */}
        <img src="/ethereum.png" alt="eth" />
        <img src="/binance-smart-chain.svg" alt="" />
        <img src="/polygan.png" alt="" />
      </div>
    </div>
  );
}

export default ChainSelector;
