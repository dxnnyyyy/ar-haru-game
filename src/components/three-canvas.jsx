import * as THREE from "three";

const ThreeCanvas = (props) => {
  const { mindarThree } = props;

  const anchor = mindarThree.addAnchor(0);

  const { camera, scene } = mindarThree;

  // Plane
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3),
    new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      visible: false,
    })
  );
  plane.name = "ground";
  anchor.group.add(plane);

  // Grid
  const grid = new THREE.GridHelper(3, 3, "", "white");
  grid.rotation.x = Math.PI / 2;
  anchor.group.add(grid);

  // Square
  const square = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
    })
  );
  square.name = "square";
  anchor.group.add(square);

  // Spheres
  const spherePlayer1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 20, 10),
    new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      wireframe: true,
      color: "blue",
    })
  );

  const spherePlayer2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 20, 10),
    new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      wireframe: true,
      color: "red",
    })
  );

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
  let player = "";

  // Click Eventlistener
  window.addEventListener("mousedown", (e) => {
    const objectExist = objects.find((object) => {
      return (
        object.position.x === localSquarePos.x &&
        object.position.y === localSquarePos.y
      );
    });

    if (!objectExist) {
      if (player === "player1") {
        const sphererClone = spherePlayer1.clone();
        sphererClone.position.set(localSquarePos.x, localSquarePos.y, 0.25);
        anchor.group.add(sphererClone);
        objects.push(sphererClone);
        player = "player2";
      } else if (player === "player2") {
        const sphereClone_2 = spherePlayer2.clone();
        sphereClone_2.position.set(localSquarePos.x, localSquarePos.y, 0.25);
        anchor.group.add(sphereClone_2);
        objects.push(sphereClone_2);
        player = "player1";
      } else {
        player = "player1";
      }
    }

    console.log(objects);
  });
  return null;
};

export default ThreeCanvas;
