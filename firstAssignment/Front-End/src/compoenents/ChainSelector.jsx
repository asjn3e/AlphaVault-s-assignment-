import React from "react";
function ChainSelector({ setChain, setIsselctorActive, handleChainChange }) {
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
            handleChainChange("eth");
          }}
          alt="eth"
        />
        <img
          src="/binance-smart-chain.svg"
          onClick={() => {
            setChain("bsc");
            setIsselctorActive(false);
            handleChainChange("bsc");
          }}
          alt=""
        />
        <img
          src="/polygan.png"
          alt=""
          onClick={() => {
            setChain("poly");
            setIsselctorActive(false);
            handleChainChange("poly");
          }}
        />
      </div>
    </div>
  );
}

export default ChainSelector;
