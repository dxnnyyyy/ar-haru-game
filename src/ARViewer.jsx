import React, { useState } from "react";
import LinkButton from "./components/LinkButton";

export default function ARViewer({ socket }) {
  const [currentPlayer, setCurrentPlayer] = useState("player1");
  const [harus, setHarus] = useState([]);
  const [winner, setWinner] = useState("");

  const player = socket.auth.player;

  function handleTileClick(e) {
    const position = e.target.components.position.data;

    if (currentPlayer === player) {
      const moveSuccsesful = updateGame(position);

      if (moveSuccsesful) {
        if (player === "player1") {
          e.target.setAttribute("color", "blue");
        }
        if (player === "player2") {
          e.target.setAttribute("color", "red");
        }
        socket.emit("player-moved", {
          haruPosition: { x: position.x, y: position.y },
          color: player === "player1" ? "blue" : "red",
        });
      }
    }
  }

  function updateGame(position, color) {
    const haruExists = harus.find((haru) => {
      return haru.props.position === `${position.x} ${position.y} 0.1`;
    });

    if (!haruExists) {
      setHarus([
        ...harus,
        <a-entity
          key={`haru-${position.x}-${position.y}`}
          gltf-model="url(/models/haru.glb)"
          position={`${position.x} ${position.y} 0.1`}
          rotation="90 0 0"
          scale="0.2 0.2 0.2"
        ></a-entity>,
      ]);
      document
        .querySelector(`#haru-${position.x}${position.y} > a-plane`)
        .setAttribute("color", color);

      return true;
    } else {
      console.log("There is already a Haru on this tile!");
      return false;
    }
  }

  socket.on("switch-player", (data) => {
    setCurrentPlayer(data.currentPlayer);
  });

  socket.on("move-done", (data) => {
    updateGame(data.haruPosition, data.color);
  });

  socket.on("winner-detected", (data) => {
    if (data.player !== "draw") {
      const winningPlayer = data.player === "player1" ? "Player 1" : "Player 2";
      setWinner(`${winningPlayer} won!`);
    } else {
      setWinner("DRAW! Nobody won :(");
    }
  });

  function renderTiles(n) {
    const tiles = [];
    const offset = n % 2 === 0 ? n / 2 - 0.5 : Math.floor(n / 2);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        tiles.push(
          <a-entity
            key={`${i}${j}`}
            id={`haru-${i - offset}${j - offset}`}
            onClick={handleTileClick}
          >
            <a-plane
              color="white"
              opacity="0.66"
              position={`${i - offset} ${j - offset} 0`}
              width="0.8"
              height="0.8"
              rotation="0 0 0"
              class="clickable"
              animation="property: scale; to: 1.2 1.2 1.2; dur: 2500; easing: easeInOutQuad; loop: true; dir: alternate"
            ></a-plane>
          </a-entity>
        );
      }
    }

    return tiles;
  }

  return (
    <>
      <div
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "white",
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>You are: {player === "player1" ? "Player 1" : "Player 2"}</div>
        <div>
          Current player:{" "}
          {currentPlayer === "player1" ? "Player 1" : "Player 2"}
        </div>
      </div>

      {winner && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              color: "white",
              fontWeight: "bold",
              marginBottom: "2rem",
            }}
          >
            {winner}
          </div>
          <LinkButton
            to="/"
            text="Back to Main Menu"
            onClick={socket.disconnect(true)}
          />
        </div>
      )}

      <a-scene
        mindar-image="imageTargetSrc: /assets/targets_front.mind; filterMinCF:0.001; filterBeta: 1000; warmupTolerance: 1; warmupTolerance: 5;"
        vr-mode-ui="enabled: false"
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        device-orientation-permission-ui="enabled: false"
      >
        <a-camera
          position="0 0 0"
          look-controls="enabled: false"
          cursor="fuse: false; rayOrigin: mouse;"
          raycaster="far: 10000; objects: .clickable"
        ></a-camera>

        <a-entity mindar-image-target="targetIndex: 0">
          {renderTiles(3)}
          {harus}
        </a-entity>
      </a-scene>
    </>
  );
}
