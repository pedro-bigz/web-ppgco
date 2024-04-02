import styled from 'styled-components'
import { Radio, FormControlLabel } from '@mui/material'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const CustomRadio = styled(Radio)`
  &.Mui-checked {
    color: #00b22a !important;
  }
`

export const CustomFormControlLabel = styled(FormControlLabel)`
  &.MuiFormControlLabel-root .MuiFormControlLabel-label {
    color: #181d11;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 500;
  }
`

export const ErrorMessage = styled.span`
  display: flex;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  color: #d32f2f;
`
