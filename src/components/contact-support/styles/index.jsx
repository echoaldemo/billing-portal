import styled from "styled-components";
import { Paper } from "@material-ui/core";

const HeaderCont = styled.div`
  display: grid;
  justify-items: center;
  margin-bottom: 30px;
`;
const Subtitle = styled.span`
  color: #a5a5a5c9;
  width: 20vw;
  text-align: center;
  font-size: 15px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 20px;
`;

const InnerGrid = styled.div`
  display: grid;
  grid-template-columns: 63px 1fr;
  justify-items: left;
  align-items: baseline;
`;

const StyledPaper = styled(Paper)`
  padding: 25px 50px 50px 50px;
  width: 45%;
  margin: 0 auto;
`;

const BtnCont = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const Label = styled.span`
  font-size: 13px;
  letter-spacing: 2px;
  color: #929292;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 25px 1fr;
`;

const Divider = styled.div`
  height: 20px;
`;

export {
  HeaderCont,
  Subtitle,
  Grid,
  InnerGrid,
  StyledPaper,
  BtnCont,
  Label,
  Container,
  Divider
};
