import { Autocomplete } from "@nextui-org/react";
import styled from "styled-components";

const StyledAutocomplete = styled(Autocomplete)`
  div[data-slot="input-wrapper"] {
    border-width: 1px;
  }
`;

export { StyledAutocomplete };
