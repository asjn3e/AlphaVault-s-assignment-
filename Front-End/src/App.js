import "./style/style.scss";
import Header from "./compoenents/Header";
import { useRef, useEffect, useState } from "react";
import { init } from "./canvasUtlis";
import WalletInfo from "./compoenents/WalletInfo";
import Tokens from "./compoenents/Tokens";
import ChainSelector from "./compoenents/ChainSelector";
import { requestAccounts } from "./metamask";
import Web3 from "web3";
import axios from "axios";

function App() {
  const [isSelectorActive, setIsselctorActive] = useState(false);
  const [chain, setChain] = useState("eth");
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setwalletAddress] = useState(null);
  const [tokens, setTokens] = useState([]);
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
      setIsConnected(false);
    } else {
      await requestAccounts();
      const account = await web3.eth.getAccounts(); //getting the walllet address
      if (account) {
        setIsConnected(true);
        setwalletAddress(account);
        try {
          const Tokens = await axios.get(
            `http://localhost:5000/wallet/${account}/${chain}`
          );
          setTokens(Tokens.data);
          console.log(tokens);
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
  const handleChainChange=()=>{
    
  }
  return (
    <div className="Container">
      {/* canvas animation */}
      <canvas className="canvas" ref={canvasRef}></canvas>
      {/* header */}
      <Header
        connectionHandler={handleConnection}
        isConnected={isConnected}
        chain={chain}
        setIsselctorActive={setIsselctorActive}
      ></Header>
      {/* wallet information */}
      <WalletInfo chain={chain} tokens={tokens} walletAddress={walletAddress} />
      {/* tokens */}
      <Tokens tokens={tokens}></Tokens>
      {/* chain selector */}
      {isSelectorActive ? (
        <ChainSelector
          setChain={setChain}
          setIsselctorActive={setIsselctorActive}
        />
      ) : null}
    </div>
  );
}

export default App;
