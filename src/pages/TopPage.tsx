import { useEffect, useRef } from "react";
import { ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene, Vector3 } from '@babylonjs/core';

const TopPage = () => {
  const renderCanvas = useRef(null);

  useEffect(() => {
    const engine = new Engine(renderCanvas.current);
    const scene = new Scene(engine);
    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new Vector3(0, 0, 0), scene);
    camera.attachControl(renderCanvas, true);
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    const box = MeshBuilder.CreateBox("box", {}, scene);
    engine.runRenderLoop(() => {
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [renderCanvas]);

  return (
    <div className="container mx-auto my-5">
      <div className="font-bold text-3xl my-5">Babyron.js</div>
      <canvas ref={renderCanvas} className="w-full"></canvas>
    </div>
  );
};

export default TopPage;