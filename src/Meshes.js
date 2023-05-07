import * as THREE from "three";

export const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(3, 3),
  new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    visible: false,
  })
);

export const grid = new THREE.GridHelper(3, 3, "", "white");

export const square = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
  })
);

export const spherePlayer1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.25, 20, 10),
  new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    wireframe: true,
    color: "blue",
  })
);

export const spherePlayer2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.25, 20, 10),
  new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    wireframe: true,
    color: "red",
  })
);
