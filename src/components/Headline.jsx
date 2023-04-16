import styled from "styled-components";

const HeadlineElement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 5rem;
  width: 100%;

  text-transform: uppercase;
  font-size: 2rem;
  font-weight: bold;
`;

export default function Headline(props) {
  return <HeadlineElement>{props.text}</HeadlineElement>;
}
