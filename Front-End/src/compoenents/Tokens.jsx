import React, { Component } from "react";

function Tokens() {
  return (
    <ul className="tokens">
      <li className="token__heading token">
        <p>Symbol</p>
        <p>Balance</p>
        <p>Price</p>
        <p>Value</p>
      </li>
      <li className="token">
        <img src="/uscd.png" alt="" />
        <p className="numbers">213123</p>
        <p className="numbers">312313</p>
        <p className="numbers">3123212</p>
      </li>
      <li className="token">
        <img src="/uscd.png" alt="" />
        <p className="numbers"></p>
        <p className="numbers"></p>
        <p className="numbers"></p>
      </li>
      <li className="token">
        <img src="/uscd.png" alt="" />
        <p className="numbers"></p>
        <p className="numbers"></p>
        <p className="numbers"></p>
      </li>
      <li className="token">
        <img src="/uscd.png" alt="" />
        <p className="numbers"></p>
        <p className="numbers"></p>
        <p className="numbers"></p>
      </li>
    </ul>
  );
}

export default Tokens;
