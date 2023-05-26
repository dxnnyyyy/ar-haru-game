import styled from "styled-components";

const PlayerContainerElement = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50vw;
  width: 100%;
`;

const PlayerElement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  font-size: 1.2rem;
  font-weight: bold;
`;

export function PlayerContainer(props) {
  const { children } = props;
  return <PlayerContainerElement>{children}</PlayerContainerElement>;
}

export function Player(props) {
  const { children } = props;
  return <PlayerElement>{children}</PlayerElement>;
}
