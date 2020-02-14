import React from 'react'
import { InputAdornment } from '@material-ui/core'
import { InputField as TryField } from 'common-components'
import styled from 'styled-components'
const BillDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: end;
`
const InputField = ({ customWidth, ...rest }) => {
  return (
    <TryField
      inputProps={{
        style: { textAlign: 'right' }
      }}
      style={{ width: customWidth || '60%', float: 'right' }}
      {...rest}
    />
  )
}
const TimeInput = ({ state, handleChange, disabled, index }) => {
  return (
    <BillDiv>
      <InputField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              hr{state.hour > 1 ? 's' : ''}
            </InputAdornment>
          )
        }}
        type="number"
        customWidth="80%"
        onChange={e => handleChange(e.target.value, 'hour', index)}
        value={state.hour}
        disabled={disabled}
      />
      <InputField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              min{state.min > 1 ? 's' : ''}
            </InputAdornment>
          )
        }}
        type="number"
        customWidth="80%"
        onChange={e => handleChange(e.target.value, 'min', index)}
        value={state.min}
        disabled={disabled}
      />
    </BillDiv>
  )
}

export default TimeInput
