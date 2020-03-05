import styled from "styled-components";
import { Close, Check, Error } from "@material-ui/icons";

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  min-height: 280px;
  height: auto;
  box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
  padding: 32px 6px 0px 6px;
`;
const CheckIcon = styled(Check)`
  background: #b6d36b;
  color: white;
  border-radius: 50%;
  width: 40px !important;
  height: 40px !important;
  path {
    width: 18px !important;
    height: 13.8px !important;
  }
`;
const WarningIcon = styled(Error)`
  font-size: 36px !important;
  color: #ff504d;
`;
const CloseIcon = styled(Close)`
  color: #444851;
`;
const CloseIconCont = styled.div`
  margin: 26px 18.5px 10px auto;
  cursor: pointer;
`;
const CloseBtn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #eeeeee;
  cursor: pointer;
  cursor: pointer;
  border: none;
  outline: none;
`;
const BtnFn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #7c8a97;
  cursor: pointer;
  border: none;
  outline: none;
`;
const BtnText = styled.span`
  width: 54px;
  height: 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #ffffff;
  text-transform: uppercase;
`;
const CloseText = styled.span`
  width: 54px;
  height: 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #444851;
  text-transform: uppercase;
`;
const BtnCont = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin: 8px 0 34px 0;
`;
const Text = styled.div`
  margin-top: 20px;
  width: 340px;
  min-height: 42px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: #7c8a97;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  text-transform: uppercase;
`;
const TextLower = styled.div`
  margin-top: 20px;
  width: 340px;
  min-height: 42px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: #7c8a97;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;
const P = styled.p`
  color: #7c8a97;
  margin: 10px 0 40px 0;
  max-width: 80%;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;
const NewUserBtn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #b6d36b;
  cursor: pointer;
  cursor: pointer;
  border: none;
  outline: none;
`;
const NewUserText = styled.strong`
  font-size: 14px;
  color: #ffffff;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Great = styled.strong`
  font-size: 18px;
  color: #444851;
  margin-top: 18px;
`;

export {
  Center,
  Card,
  CheckIcon,
  WarningIcon,
  CloseIcon,
  CloseIconCont,
  CloseBtn,
  BtnFn,
  BtnText,
  CloseText,
  BtnCont,
  Text,
  P,
  NewUserBtn,
  NewUserText,
  Great,
  TextLower
};
