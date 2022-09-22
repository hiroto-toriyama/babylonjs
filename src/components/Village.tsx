import { useEffect, useRef } from "react";
import { ArcRotateCamera, Color3, Engine, HemisphericLight, Mesh, MeshBuilder, Scene, SceneLoader, Sound, StandardMaterial, Texture, Vector3, Vector4 } from '@babylonjs/core';

const Village = () => {
  const renderCanvas = useRef(null);

  const buildHouse = (width: number) => {
    const box = buildBox(width);
    const roof = buildRoof(width);

    return Mesh.MergeMeshes([box, roof], true, false, undefined, false, true);
  }

  const buildGround = () => {
    const groundMat = new StandardMaterial("groundMat");
    groundMat.diffuseColor = new Color3(0, 1, 0);

    const ground = MeshBuilder.CreateGround("ground", {width: 15, height: 16}); 
    ground.material = groundMat;

    return ground;
  }

  const buildBox = (width: number) => {
    const boxMat = new StandardMaterial("boxMat");
    if (width == 2)
      boxMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/semihouse.png");
    else
      boxMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/cubehouse.png");
    
    const faceUV = [];
    if (width == 2) {
      faceUV[0] = new Vector4(0.6, 0.0, 1.0, 1.0); //rear face
      faceUV[1] = new Vector4(0.0, 0.0, 0.4, 1.0); //front face
      faceUV[2] = new Vector4(0.4, 0, 0.6, 1.0); //right side
      faceUV[3] = new Vector4(0.4, 0, 0.6, 1.0); //left side
    } else {
      faceUV[0] = new Vector4(0.5, 0.0, 0.75, 1.0); //rear face
      faceUV[1] = new Vector4(0.0, 0.0, 0.25, 1.0); //front face
      faceUV[2] = new Vector4(0.25, 0, 0.5, 1.0); //right side
      faceUV[3] = new Vector4(0.75, 0, 1.0, 1.0); //left side
    }

    const box = MeshBuilder.CreateBox("box", {width: width, faceUV: faceUV, wrap: true});
    box.position.y = 0.5;
    box.material = boxMat;
    
    return box;
  }

  const buildRoof = (width: number) => {
    const roofMat = new StandardMaterial("roofMat");
    roofMat.diffuseTexture = new Texture("https://assets.babylonjs.com/environments/roof.jpg");
    
    const roof = MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
    roof.scaling.x = 0.75;
    roof.rotation.z = Math.PI / 2;
    roof.scaling.y = width;
    roof.position.y = 1.22;
    roof.material = roofMat;

    return roof;
  }

  const buildDwellings = () => {
    const ground = buildGround();

    const detached_house = buildHouse(1);
    if (detached_house) {
      detached_house.rotation.y = -Math.PI / 16;
      detached_house.position.x = -6.8;
      detached_house.position.z = 2.5;
    }

    const semi_house = buildHouse(2);
    if (semi_house) {
      semi_house .rotation.y = -Math.PI / 16;
      semi_house.position.x = -4.5;
      semi_house.position.z = 3;
    }

    const places = []; //each entry is an array [house type, rotation, x, z]
    places.push([1, -Math.PI / 16, -6.8, 2.5]);
    places.push([2, -Math.PI / 16, -4.5, 3]);
    places.push([2, -Math.PI / 16, -1.5, 4]);
    places.push([2, -Math.PI / 3, 1.5, 6]);
    places.push([2, 15 * Math.PI / 16, -6.4, -1.5]);
    places.push([1, 15 * Math.PI / 16, -4.1, -1]);
    places.push([2, 15 * Math.PI / 16, -2.1, -0.5]);
    places.push([1, 5 * Math.PI / 4, 0, -1]);
    places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3]);
    places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5]);
    places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7]);
    places.push([2, Math.PI / 1.9, 4.75, -1]);
    places.push([1, Math.PI / 1.95, 4.5, -3]);
    places.push([2, Math.PI / 1.9, 4.75, -5]);
    places.push([1, Math.PI / 1.9, 4.75, -7]);
    places.push([2, -Math.PI / 3, 5.25, 2]);
    places.push([1, -Math.PI / 3, 6, 4]);

    //Create instances from the first two that were built 
    const houses = [];
    for (let i = 0; i < places.length; i++) {
        if (places[i][0] === 1 && detached_house) {
            houses[i] = detached_house.createInstance("house" + i);
        } else if (semi_house) {
            houses[i] = semi_house.createInstance("house" + i);
        }
        houses[i].rotation.y = places[i][1];
        houses[i].position.x = places[i][2];
        houses[i].position.z = places[i][3];
    }    
  }

  const createScene = () => {
    const engine = new Engine(renderCanvas.current);
    const scene = new Scene(engine);
    const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0));
    camera.attachControl(renderCanvas);
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    buildDwellings();

    return scene;
  }

  useEffect(() => {
    const engine = new Engine(renderCanvas.current);
    const scene = createScene();
    
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