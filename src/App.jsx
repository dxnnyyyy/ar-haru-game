import styled from "styled-components";

import Headline from "./components/Headline";
import LinkButton from "./components/LinkButton";

const Image = styled.img`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  height: 90vw;
  margin: 1rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
`;

export default function App() {
  return (
    <>
      <Headline text="AR Haru Tic-Tac-Toe" />

      <Image src="https://via.placeholder.com/1080x1080/eee?text=1:1" alt="" />

      <ButtonContainer>
        <LinkButton
          to="/create-lobby"
          text="Create Lobby"
          style={{ marginBottom: "1.5rem" }}
        />
        <LinkButton
          to="/join-lobby"
          text="Join Lobby"
          style={{ marginBottom: "1.5rem" }}
        />
        <LinkButton
          to="https://www.strichpunkt-design.de/en/research"
          text="Visit my friends @ SP"
          style={{ marginBottom: "1.5rem" }}
        />
      </ButtonContainer>
    </>
  );
}
