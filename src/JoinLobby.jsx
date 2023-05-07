import Headline from "./components/Headline";
import styled from "styled-components";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

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

function connectToLobby(socket, roomId) {
  socket.auth = { player: "player2", room: roomId };
  socket.connect();

  socket.emit("room", roomId);
}

export default function JoinLobby(props) {
  const inputRef = useRef();
  const navigate = useNavigate();

  const { socket } = props;

  socket.on("start-game-seq", (data) => {
    if (data) {
      navigate("/game");
    }
  });

  return (
    <>
      <Headline text="join lobby" />
      <FlexContainer>
        <label>Enter Lobby Code:</label>
        <Input ref={inputRef} name="lobbyCode" />
        <button
          onClick={() => {
            connectToLobby(socket, inputRef.current.value);
          }}
        >
          join game
        </button>
      </FlexContainer>
    </>
  );
}
