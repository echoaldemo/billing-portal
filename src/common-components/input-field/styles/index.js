import styled from "styled-components";
import { TextField } from "@material-ui/core";

export const SelectField = styled(TextField)`
  .MuiInputLabel-shrink {
    color: #999999 !important;
    font-size: 18px;
    font-weight: 800;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
  }
  .MuiFormLabel-root.Mui-focused {
    color: #1194f6 !important;
  }
  .Mui-error {
    color: #f44336 !important;
  }
  .MuiInput-underline.Mui-error:after {
    border-bottom-color: #f44336 !important;
  }
  .MuiInput-underline {
    &::before {
      border-bottom: solid 1px rgba(238, 238, 238, 0.99);
    }
    &::after {
      border-bottom: 2px solid #1194f6;
    }
  }
`;
