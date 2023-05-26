import styled from "styled-components";

const ImageElement = styled.img`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  height: 60vw;
  margin: 1rem 0;
`;

export default function Image(props) {
  const { src, alt } = props;
  return <ImageElement src={src} alt={alt} />;
}
