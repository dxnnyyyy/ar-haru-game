export function createRoomId(length) {
  let result = "";
  // const characters =
  //   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const characters = "0123456789";

  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

// render n x n tile grid
export function renderTiles(n, handleTileClick) {
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

export function formatPlayerString(player) {
  return player === "player1" ? "Player 1" : "Player 2";
}
