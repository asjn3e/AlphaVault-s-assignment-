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
  // app's states 
  const [isSelectorActive, setIsselctorActive] = useState(false);
  const [chain, setChain] = useState("eth");
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setwalletAddress] = useState("0x00...0000");
  const [tokens, setTokens] = useState([]);
  const [taotalBalance, setTotalBalance] = useState(0);
  const [web3, setWeb3] = useState(new Web3(window.ethereum));

  // app's refrences 
  const canvasRef = useRef(null);

  
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
      setwalletAddress("0x0..0000");
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

          //calculating the total balnce

          let totalBalance = 0;
          Tokens.data.forEach((token) => {
            totalBalance += Number(token.balanceIntoUSD);
          });

          setTotalBalance(totalBalance);
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  // event for requesting wallet info when user changed chain
  const handleChainChange = async (chain) => {
    if (isConnected) {
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

          //calculating the total balance
          let totalBalance = 0;
          Tokens.data.forEach((token) => {
            totalBalance += Number(token.balanceIntoUSD);
          });

          setTotalBalance(totalBalance);
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  //rendering part
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
      <WalletInfo
        chain={chain}
        tokens={tokens}
        walletAddress={walletAddress}
        taotalBalance={taotalBalance}
      />
      {/* tokens */}
      <Tokens tokens={tokens}></Tokens>
      {/* chain selector */}
      {isSelectorActive ? (
        <ChainSelector
          setChain={setChain}
          setIsselctorActive={setIsselctorActive}
          handleChainChange={handleChainChange}
        />
      ) : null}
    </div>
  );
}

export default App;
