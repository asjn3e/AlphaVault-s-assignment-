import React, { Component } from "react";
function WalletInfo() {
  return (
    // data table for information 
    <div className="details">
      <div className="detail">
        <p>Total Balance :</p>
        <h3 className="details--first">1331000 $</h3>
      </div>
      <div className="detail">
        <p>Chain :</p>
        <h3 className="details--second">Etherum</h3>
      </div>
      <div className="detail">
        <p>wallet Adress :</p>
        <h3 className="details--third">0x00000000</h3>
      </div>
      <div className="detail">
        <p>number of tokens :</p>
        <h3 className="details--forth">15</h3>
      </div>
    </div>
  );
}

export default WalletInfo;
