import React, { Component } from "react";
function WalletInfo({ tokens, chain, walletAddress }) {
  return (
    // data table for information
    <div className="details">
      <div className="detail">
        <p>Total Balance :</p>
        <h3 className="details--first">
          {tokens.length != 0
            ? tokens.reduce((previousValue, currentValue) => {
                previousValue += currentValue;
              })
            : "0"}
        </h3>
      </div>
      <div className="detail">
        <p>Chain :</p>
        <h3 className="details--second">{chain}</h3>
      </div>
      <div className="detail">
        <p>wallet Adress :</p>
        <h3 className="details--third">
          {
            // Create the formatted address with 6 digits and 3 dots in the middle
            walletAddress
              ? `${walletAddress.toString().substr(0, 4)}...${walletAddress
                  .toString()
                  .substr(walletAddress.length - 3)}`
              : ""
          }
        </h3>
      </div>
      <div className="detail">
        <p>number of tokens :</p>
        <h3 className="details--forth">{tokens.length || 0}</h3>
      </div>
    </div>
  );
}

export default WalletInfo;
