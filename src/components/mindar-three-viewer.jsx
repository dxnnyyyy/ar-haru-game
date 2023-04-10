import React, { useEffect, useRef, useState } from "react";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
import ThreeCanvas from "./three-canvas";

const MindARThreeViewer = () => {
  const containerRef = useRef(null);
  const [mindarThree, setMindarThree] = useState();

  useEffect(() => {
    const mindarThree = new MindARThree({
      container: containerRef.current,
      imageTargetSrc: "/assets/targets_front.mind",
    });

    setMindarThree(mindarThree);

    const { renderer, scene, camera } = mindarThree;

    mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    return () => {
      renderer.setAnimationLoop(null);
      mindarThree.stop();
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }} ref={containerRef}>
      {mindarThree && <ThreeCanvas mindarThree={mindarThree} />}
    </div>
  );
};

export default MindARThreeViewer;
