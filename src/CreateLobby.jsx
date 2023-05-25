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
  const room = createRoomId(4);

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
        <Button
          onClick={() => {
            socket.emit("start-game", room);
          }}
        >
          start game
        </Button>
      </ButtonContainer>
    </>
  );
}
