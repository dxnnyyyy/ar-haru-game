import Headline from "./components/Headline";
import styled from "styled-components";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  border-radius: 2rem;
  width: 15rem;
  padding: 0.8rem 1.2rem;
  margin: 1rem;
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

function connectToLobby(socket, roomId) {
  socket.auth = { player: "player2", room: roomId };
  socket.connect();

  socket.emit("room", roomId);
}

export default function JoinLobby(props) {
  const inputRef = useRef();
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(true);

  const { socket } = props;

  socket.on("start-game-seq", (data) => {
    if (data) {
      navigate("/game");
    }
  });

  return (
    <>
      <Headline text="join lobby" />
      <PlayerContainer>
        <Player>
          <p>You are:</p>
          <p>Player 2 (Red)</p>
        </Player>
        <Player>
          <p>Your opponent is:</p>
          <p>Player 1 (Blue)</p>
        </Player>
      </PlayerContainer>
      <FlexContainer>
        <label>Enter Lobby Code:</label>
        <Input ref={inputRef} name="lobbyCode" />
        {showButton ? (
          <Button
            onClick={() => {
              connectToLobby(socket, inputRef.current.value);
              setShowButton(false);
            }}
          >
            join game
          </Button>
        ) : (
          "Wait for Player 1 to start game ... "
        )}
      </FlexContainer>
    </>
  );
}
