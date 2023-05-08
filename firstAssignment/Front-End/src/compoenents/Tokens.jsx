import React from "react";

function Tokens({ tokens }) {
  console.log(tokens);
  return (
    <ul className="tokens">
      {/* heading for tokens table */}
      <li className="token__heading token">
        <p>Symbol</p>
        <p>name</p>
        <p>Balance</p>
        <p>Value</p>
      </li>
      {/* mapping over available tokens in the wallet */}
      {tokens.map((token) => {
        return (
          <li key={token.symbol} className="token">
            {/* tokens image */}
            <img src={token.logo} alt="" />
            {/* tokens symbol */}
            <p className="numbers">{token.symbol}</p>
            {/* tokens balance */}
            <p className="numbers">{token.balance}</p>
            {/* tokens balance into us dollors */}
            <p className="numbers">{token.balanceIntoUSD}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default Tokens;
