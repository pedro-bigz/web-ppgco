import { LoadingLogoIcon } from "assets";
import { useWindowSize } from "core";
import styled from "styled-components";

const Container = styled.div<{ $width?: number; $height?: number }>`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  position: relative;
`;

const CentredContent = styled.div<{ $width?: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => props.$width}px;
`;

export function LoadingLogo() {
  const { windowSize } = useWindowSize();

  return (
    <Container $width={windowSize.innerWidth} $height={windowSize.innerHeight}>
      CU CU CU CU CU CU CU CU CU CUCU CU
      <CentredContent $width={500}>
        <LoadingLogoIcon />
      </CentredContent>
    </Container>
  );
}
