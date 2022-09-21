import { useEffect, useRef } from "react";
import { ArcRotateCamera, Engine, HemisphericLight, MeshBuilder, Scene, SceneLoader, Vector3 } from '@babylonjs/core';

const Village = () => {
  const renderCanvas = useRef(null);

  useEffect(() => {
    const engine = new Engine(renderCanvas.current);
    const scene = new Scene(engine);
    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0));
    camera.attachControl(renderCanvas);
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon")
      .then((result) => { // 読み込みが完了したら
        const house1 = scene.getMeshByName("detached_house");
        if (house1?.position)
          house1.position.y = 2; // y 軸方向(↑)に +2
        const house2 = result.meshes[2];
        house2.position.y = 1;
    });
    engine.runRenderLoop(() => {
      scene.render();
    });
  }, [renderCanvas]);

  return (
    <div>
      <canvas ref={renderCanvas} className="w-full"></canvas>
    </div>
  );
};

export default Village;