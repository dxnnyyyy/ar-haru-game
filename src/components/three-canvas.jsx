import * as THREE from "three";
import {
  plane,
  grid,
  square,
  spherePlayer1,
  spherePlayer2,
} from "../Meshes.js";

export default function ThreeCanvas({ mindarThree, socket }) {
  const anchor = mindarThree.addAnchor(0);

  const { camera, scene } = mindarThree;

  // Plane
  plane.name = "ground";
  anchor.group.add(plane);

  // Grid
  grid.rotation.x = Math.PI / 2;
  anchor.group.add(grid);

  // Square
  square.name = "square";
  anchor.group.add(square);

  const mousePos = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  let localSquarePos;

  // Hover Eventlistener
  window.addEventListener("mousemove", (e) => {
    mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mousePos, camera);

    const intersects = raycaster.intersectObjects(scene.children[0].children);

    intersects.forEach((intersect) => {
      if (intersect.object.name === "ground") {
        const squarePos = new THREE.Vector3().copy(intersect.point);
        localSquarePos = plane.worldToLocal(squarePos);

        localSquarePos.round();

        square.position.set(localSquarePos.x, localSquarePos.y, 0);
      }
    });
  });

  const objects = [];
  const player = socket.auth.player;
  let currentPlayer = "player1";

  // Click Eventlistener
  window.addEventListener("mousedown", (e) => {
    const objectExist = objects.find((object) => {
      return (
        object.position.x === localSquarePos.x &&
        object.position.y === localSquarePos.y
      );
    });

    if (currentPlayer === player) {
      if (!objectExist) {
        if (player === "player1") {
          const sphereClone = spherePlayer1.clone();
          sphereClone.position.set(localSquarePos.x, localSquarePos.y, 0.25);
          anchor.group.add(sphereClone);
          objects.push(sphereClone);
          socket.emit("player-moved", {
            sphere: sphereClone,
            position: { x: localSquarePos.x, y: localSquarePos.y, z: 0.25 },
          });
        } else if (player === "player2") {
          const sphereClone_2 = spherePlayer2.clone();
          sphereClone_2.position.set(localSquarePos.x, localSquarePos.y, 0.25);
          anchor.group.add(sphereClone_2);
          objects.push(sphereClone_2);
          socket.emit("player-moved", {
            sphere: sphereClone_2,
            position: { x: localSquarePos.x, y: localSquarePos.y, z: 0.25 },
          });
        }
      }
    }
  });

  const loader = new THREE.ObjectLoader();

  socket.on("move-done", (data) => {
    const object = loader.parse(data.sphere);
    object.position.set(data.position.x, data.position.y, data.position.z);
    anchor.group.add(object);
    objects.push(object);
  });

  socket.on("switch-player", (data) => {
    currentPlayer = data.currentPlayer;
  });

  socket.on("winner-detected", (data) => {
    console.log("Winner: ", data);
  });
}
