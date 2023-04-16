import { Link } from "react-router-dom";
import styled from "styled-components";

const CustomLinkButton = styled(Link)`
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

export default function LinkButton(props) {
  const { to, text, style } = props;
  return (
    <CustomLinkButton to={to} style={style}>
      {text}
    </CustomLinkButton>
  );
}
