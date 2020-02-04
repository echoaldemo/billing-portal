import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

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
  height: 270px;
  box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
`;
const Text = styled.div`
  margin-top: 47px;
  width: 272px;
  height: 42px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: #7c8a97;
`;
const LoadingIcon = styled(CircularProgress)`
  color: #1194f6 !important;
  width: 45px !important;
  height: 45px !important;
  margin: 35px 0;
`;
const Button = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #eeeeee;
  border: none;
  outline: none;
  cursor: pointer;
`;
const Cancel = styled.span`
  margin-bottom: 31px;
  width: 54px;
  height: 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #444851;
  text-transform: uppercase;
`;

export { Center, Card, Text, LoadingIcon, Button, Cancel };
