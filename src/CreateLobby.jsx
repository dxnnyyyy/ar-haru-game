import styled from "styled-components";
import Headline from "./components/Headline";
import { createRoomId } from "./utils";
import { useNavigate } from "react-router-dom";

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

const ButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

export default function CreateLobby(props) {
  const { socket } = props;
  const room = createRoomId(6);

  socket.auth = { player: "player1", room: room };
  socket.connect();

  const navigate = useNavigate();

  socket.emit("room", room);

  socket.on("start-game-seq", (data) => {
    if (data) {
      navigate("/game");
    }
  });

  return (
    <>
      <Headline text="create lobby" />
      <LobbyCode>Lobby Code: {room}</LobbyCode>

      <ButtonContainer>
        <button
          onClick={() => {
            socket.emit("start-game", room);
          }}
        >
          start game
        </button>
      </ButtonContainer>
    </>
  );
}
