import "./style/style.scss";
import Header from "./compoenents/Header";
import { useRef, useEffect, useState } from "react";
import { init } from "./canvasUtlis";
import WalletInfo from "./compoenents/WalletInfo";
import Tokens from "./compoenents/Tokens";
import ChainSelector from "./compoenents/ChainSelector";
import { requestAccounts } from "./metamask";
import Web3 from "web3";

function App() {
  const [isSelectorActive, setIsselctorActive] = useState(false);
  const [chain, setChain] = useState("ETH");
  const [isConnected, setIsConnected] = useState(false);
  const [walletAdress, setWalletAdress] = useState(null);
  const canvasRef = useRef(null);
  const [web3, setWeb3] = useState(new Web3(window.ethereum));
  //use effect for running canvas animation
  useEffect(() => {
    let ctx = canvasRef.current.getContext("2d"); //geting canvas api

    canvasRef.current.height = document.querySelector("body").clientHeight; //setting canvas height
    canvasRef.current.width = document.querySelector("body").clientWidth; //setting canvas width
    let circles = init(canvasRef.current); //canvas objects
    //animating function
    function animate() {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      circles.forEach((element) => {
        element.update(canvasRef.current);
        element.draw(ctx);
      });
      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  //event for connecton to meta mask and getting the wallet address
  const handleConnection = async () => {
    if (isConnected) {
      console.log(window.ethereum);
      setIsConnected(false);
    } else {
      await requestAccounts();
      const account = await web3.eth.getAccounts(); //getting the walllet address
      console.log(account);
      if (account) {
        setIsConnected(true);
        setWalletAdress(account);
      }
    }
  };
  return (
    <div className="Container">
      {/* canvas animation */}
      <canvas className="canvas" ref={canvasRef}></canvas>
      {/* header */}
      <Header
        connectionHandler={handleConnection}
        isConnected={isConnected}
      ></Header>
      {/* wallet information */}
      <WalletInfo />
      {/* tokens */}
      <Tokens></Tokens>
      {/* chain selector */}
      {isSelectorActive ? <ChainSelector /> : null}
    </div>
  );
}

export default App;
