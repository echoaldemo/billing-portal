import React, { useContext } from "react";
import { Typography, Paper, TextareaAutosize } from "@material-ui/core";
import { InputField } from "common-components";
import { StateContext } from "context/StateContext";
import styled from "styled-components";

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
  grid-template-columns: 70px 1fr;
`;

const StyledPaper = styled(Paper)`
  padding: 50px;
  width: 45%;
  margin: 0 auto;
`;

const ContactSupport = () => {
  const { state } = useContext(StateContext);
  const { familyName, givenName, email } = state.userProfile;
  return (
    <React.Fragment>
      <StyledPaper>
        <HeaderCont>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Subtitle>
            Our team is happy to answer your questions. Fill out the form and
            we'll be in touch as soon as possible.
          </Subtitle>
        </HeaderCont>
        <Grid>
          <InnerGrid>
            <span>NAME:</span>
            <span>
              <b>{`${givenName} ${familyName}`}</b>
            </span>
          </InnerGrid>
          <InnerGrid>
            <span>EMAIL:</span>
            <span>
              <b>{email}</b>
            </span>
          </InnerGrid>
        </Grid>
        <div style={{ marginBottom: 10 }}>SUBJECT:</div>
        <InputField variant="outlined" inputProps={{ style: { width: 550 } }} />
        <div style={{ marginTop: 20 }}>MESSAGE:</div>
        <TextareaAutosize
          aria-label="minimum height"
          rowsMin={3}
          placeholder="Minimum 3 rows"
        />
      </StyledPaper>
    </React.Fragment>
  );
};

export default ContactSupport;
