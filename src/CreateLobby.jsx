import styled from "styled-components";
import { createRoomId } from "./utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Headline from "./components/Headline";
import Button from "./components/Button";
import { Player, PlayerContainer } from "./components/Player";

const LobbyCode = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 5rem;
  width: 100%;

  font-weight: bold;
  font-size: x-large;
`;

export default function CreateLobby(props) {
  const { socket } = props;

  const [didSeconPlayerJoin, setDidSeconPlayerJoin] = useState(false);
  const [room, setRoom] = useState();
  const navigate = useNavigate();

  if (!didSeconPlayerJoin) {
    if (!room) setRoom(createRoomId(4));

    socket.auth = { player: "player1", room: room };
    socket.connect();

    socket.emit("room", room);
  }

  socket.on("second-player-joined", (data) => {
    setDidSeconPlayerJoin(data);
  });

  socket.on("start-game-seq", (data) => {
    if (data) {
      navigate("/game");
    }
  });

  return (
    <>
      <Headline text="create lobby" />
      <LobbyCode>Lobby Code: {room}</LobbyCode>
      <PlayerContainer>
        <Player>
          <p>You are:</p>
          <p>Player 1 (Blue)</p>
        </Player>
        <Player>
          {didSeconPlayerJoin ? (
            <>
              <p>Your opponent is:</p>
              <p>Player 2 (Red)</p>
            </>
          ) : (
            "Wait for opponent . . ."
          )}
        </Player>
      </PlayerContainer>

      {didSeconPlayerJoin && (
        <Button
          onClick={() => {
            socket.emit("start-game", room);
          }}
        >
          Start Game
        </Button>
      )}
    </>
  );
}
