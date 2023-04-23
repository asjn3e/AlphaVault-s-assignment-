import React, { Component } from "react";

function Tokens({ tokens }) {
  console.log(tokens);
  return (
    <ul className="tokens">
      <li className="token__heading token">
        <p>Symbol</p>
        <p>name</p>
        <p>Balance</p>
        <p>Value</p>
      </li>
      {tokens.map((token) => {
        return (
          <li className="token">
            <img src={token.logo} alt="" />
            <p className="numbers">{token.symbol}</p>

            <p className="numbers">{token.balance}</p>
            <p className="numbers">{token.balanceIntoUSD}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default Tokens;
