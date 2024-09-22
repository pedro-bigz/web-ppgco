import styled from "styled-components";

const AlertImage = styled.img<{
  $height?: number;
  $aspectRatio?: [number, number];
}>`
  max-width: fit-content;
  overflow: hidden;
  position: absolute;

  @media (max-width: 600px) {
    width: 130vw;
    z-index: 50;
  }

  @media (min-width: 601px) {
    width: auto;
    height: ${(props) => props.$height}px;
    aspect-ratio: ${(props) => props.$aspectRatio?.[0]} /
      ${(props) => props.$aspectRatio?.[1]} !important;
  }
`;

export { AlertImage };
