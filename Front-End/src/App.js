import "./style/style.scss";
import Header from "./compoenents/Header";
import { useRef, useEffect, useState } from "react";
import { init } from "./canvasUtlis";
function App() {
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

  return (
    <div className="App">
      <canvas className="canvas" ref={canvasRef}></canvas>
      <Header></Header>
    </div>
  );
}

export default App;
