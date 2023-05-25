import styled from "styled-components";
import Headline from "./components/Headline";
import { createRoomId } from "./utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50vw;
  width: 100%;
`;

const Player = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  font-size: 1.2rem;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 5rem;
  width: 100%;
`;

const Button = styled.button`
  color: black;
  background: white;
  font-weight: bold;
  height: fit-content;
  padding: 0.8rem 1.4rem;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  font-size: 1.2rem;
  text-decoration: none;
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
        <ButtonContainer>
          <Button
            onClick={() => {
              socket.emit("start-game", room);
            }}
          >
            start game
          </Button>
        </ButtonContainer>
      )}
    </>
  );
}
