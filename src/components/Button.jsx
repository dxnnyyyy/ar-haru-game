import styled from "styled-components";
import { Link } from "react-router-dom";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 5rem;
  width: 100%;
`;

const LinkButton = styled(Link)`
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

export default function Button(props) {
  const { children, to, onClick, style } = props;

  return (
    <ButtonContainer>
      <LinkButton to={to} onClick={onClick} style={style}>
        {children}
      </LinkButton>
    </ButtonContainer>
  );
}
